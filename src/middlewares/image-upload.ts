import { NextFunction, Request, Response } from "express";

export const imageUploadMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    try{  
        if(!req.files || Object.values(req.files).flat().length === 0){
            return res.status(400).json({ message: "No file selected" });
        }
       return res.status(200).json("hello")
    }catch(_: any){
        console.log("[IMAGE-MIDDLEWARE]", _.message || _)
        return res.status(500).json({message: _.message || "Internal Server Error"})
    }
}