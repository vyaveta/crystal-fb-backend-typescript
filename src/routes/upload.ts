import { uploadImages } from "../controllers/upload"
import express from "express"
import { authUser } from "../middlewares/auth"
import { imageUploadMiddleware } from "../middlewares/image-upload"

const uploadRouter = express.Router()

uploadRouter.post("/upload-images",imageUploadMiddleware, uploadImages)

export default uploadRouter