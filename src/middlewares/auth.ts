import { NextFunction, Response } from "express"
import { injectedRequest } from "interfaces/request-body.interface"
import jwt from "jsonwebtoken"

export const authUser = async (req: injectedRequest, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization
        if(!authHeader) return res.status(400).json({message: "invalid authentificaiton!!"})
 
        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
            if(error) return res.status(400).json({message: "invalid authentificaiton!!"})
            // @ts-ignore
            req.user = user
            next()
        }) 

    }catch(error: any){
        console.log("user auth middleware check failed!!!")
        return res.status(500).json({message: error.message})
    }
}