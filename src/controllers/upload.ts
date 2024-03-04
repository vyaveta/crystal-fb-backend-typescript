import { Request, Response } from "express";

export const uploadImages = async (req: Request, res: Response) => {
    try{
        
    }catch(_: any){
        console.log("[UPLOAD_IMAGES]", _.message || _)
        res.status(500).json({message: _.message || "Internal Server Error, upload failed!"})
    }
}