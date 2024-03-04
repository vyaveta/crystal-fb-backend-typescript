import { Request, Response } from "express"
import { PostModel } from "models/post"

export const createPost = async (req: Request, res: Response) => {
    try{
        const post = await new PostModel(req.body).save()
        res.status(200).json({
            ...post,
            message: "Succesfully created your post!"
        })
    }catch(_:any){
        console.log("[CREATE_POST]", _.message || _)
        return res.status(500).json({message: _.message || "Internal Server Error, Failed to create your post"})
    }
}