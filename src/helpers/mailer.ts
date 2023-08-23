const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv")
dotenv.config()

const oauth_link = "https://developers.google.com/oauthplayground";

const { OAuth2 } = google.auth;

const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH, MAILING_ACCESS } =
  process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

export const sendVerificationEmail = (email: string,name: string,url: string) => { 
    try{
        auth.setCredentials({
            refresh_token: MAILING_REFRESH,
        })
        const accessToken = auth.getAccessToken()
        const stmp = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL,
                clientId: MAILING_ID,
                clientSecret: MAILING_SECRET,
                refreshToken: MAILING_REFRESH,
                accessToken,
            }
        })
        const mailOptions = {
            from: EMAIL,
            to: email,
            subject: 'Crystal FB email verification!',
            html: `<div style="max-width: 700px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-weight: 600; color: #3b5998; " > <img style="width: 30px;" src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt=""> <span>Action required: Activate your crystalfb account!</span> </div> <div style="padding: 1rem 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; color: #141823; font-size: 17px; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; " > <span> Hello ${name} </span> <div style="padding: 20px 0" > <span style="padding: 1.5rem 0;" > You recently created an account on crystalfb. To complete your registration, please confirm your account. </span> </div> <a style="width: 200px; padding: 10px; background: #4c649b; color: #ffff ; text-decoration: none; font-weight: 600" href=${url}>Confirm your account</a> <br> <div style="padding-top: 20px; "> <span style="margin: 1.5rem 0; color: #898f9c;" >Crystalfb is a clone of facebook, in which mark zuckerberg have no access to your datas and wont be able to sell it to other marketing companies, therefore it is secure and safe to use!</span> </div> </div>`,
        }
        stmp.sendMail(mailOptions,(err: unknown,res: any) => {
            if(err) return err
            return res
        })
    }catch(error){
        console.log("[SEND_VERIFICATION_MAIL]",error.message)
        return
    }
}