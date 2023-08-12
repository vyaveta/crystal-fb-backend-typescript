import jwt from "jsonwebtoken"

export const generateToken = (payload: any, expired: string) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn : expired || "7d"
    })
}
