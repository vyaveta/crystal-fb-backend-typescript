import { Request, Response } from 'express';
import { UserDetails, injectedRequest } from "../interfaces/request-body.interface"
import { validateEmail, validateLength, validateRequiredFields, validateUsername } from "../helpers/validations"
import { UserModel } from "../models/user"
import bcrypt from "bcrypt"
import { generateToken } from '../helpers/tokens';
import { sendVerificationEmail } from '../helpers/mailer';
import jwt from "jsonwebtoken"


export const register = async (req: Request, res: Response) => {
    try {

        console.log(req.body,'Is the req body')
        const {
            first_name,
            last_name,
            email,
            bYear,
            bMonth,
            bDay,
            gender,
            password,
        }: UserDetails = req.body;


        //validations
        const requiredFields = ['first_name', 'last_name', 'email', 'bYear', 'bMonth', 'bDay', 'gender', 'password',];

        if (!validateRequiredFields(req.body, requiredFields))
            return res.status(400).json({ message: "some datas are missing" });
        if (!validateEmail(email))
            return res.status(400).json({ message: "invalid email" });
        if (!validateLength(first_name, 2, 30))
            return res.status(400).json({ message: "first name must be between 2 and 30 characters" });
        if (!validateLength(last_name, 2, 30))
            return res.status(400).json({ message: "last name must be between 2 and 30 characters" });
        if (!validateLength(password, 6, 40))
            return res.status(400).json({ message: "password must be between 6 and 40 characters" });

        const emailExists = await UserModel.findOne({ email })
        if (emailExists) return res.status(400).json({ message: "This email is already in use!" })

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUsername: string = await validateUsername(first_name + last_name)

        const user = await new UserModel({
            first_name,
            last_name,
            email,
            username: newUsername,
            bYear,
            bMonth,
            bDay,
            gender,
            password: hashedPassword,
        }).save();

        const emailVerificationToken = generateToken({ id: user._id.toString() }, "7d")

        const url = `${process.env.BACKEND_URL}/activate/${emailVerificationToken}`

        // sendVerificationEmail(user.email, user.first_name, url)
        
        const token: string = generateToken({ id: user._id.toString() }, "7d")

        return res.status(200).json({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: "Register success,verify your email to continue.",
        });

    } catch (error: any) {
        console.log("[REGISTER_USER]", error.message)
        return res.status(500).json(error)
    }
}

export const activateAccount = async (req: injectedRequest, res: Response) => {
    try {
        const { token } = req.body
        // const reqUserId = req.user?.id
        const user: { id: string } = jwt.verify(token, process.env.TOKEN_SECRET) as { id: string };
        const check = await UserModel.findById(user.id);

        // if(reqUserId !== user.id || reqUserId !== check._id.toString()) return res.status(400).json({ message: "The token does not belong to the logged in account, log into your account and try activating again!" });

        if (check.verified === true) return res.status(400).json({ message: "this email is already activated!" });

        else {
            await UserModel.findByIdAndUpdate(user.id, { verified: true })
            return res.status(200).json({ message: "Your Crystalfb account has been activated successfuly" });
        }

    } catch (error: any) {
        console.log("[ACTIVATE_USER]", error.message)
        return res.status(500).json(error)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })
        if (!user) return res.status(400).json({ message: 'The email that you have entered is not connected to an acccount!' })

        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) return res.status(400).json({ message: "Incorrect password" })

        const token = generateToken({ id: user._id.toString() }, "30d");

        return res.status(200).json({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: `Logged in as ${user.first_name}`,
        });
        
    } catch (error: any) {
        console.log("[LOGIN_USER]", error.message)
        return res.status(500).json(error)
    }
}

export const auth = (req: Request,res: Response) => {
    try{
        // @ts-ignore
        res.status(200).json(req.user)
    }catch(error: any){
        res.status(500).json(error.message)
        console.log("[AUTH_USER]", error)
    }
}

export const sendVerification = async (req: injectedRequest, res: Response) => {
    try{
        const userId = req.user.id
        const user = await UserModel.findById(userId) 

        if(user.verified) return res.status(400).json({message: "Your account email is already verified!,you can report bug if something is wrong!"})

        const emailVerificationToken = generateToken({ id: user._id.toString() }, "7d")
        const url = `${process.env.BACKEND_URL}/activate/${emailVerificationToken}`

        sendVerificationEmail(user.email, user.first_name, url)

        return res.status(200).json({message: "email verification link has been sent, check your mail inbox"})
        
    }catch(error: any){
        console.log("[SEND_VERIFICATION]",error)
        return res.status(500).json(error.message)
    }
}