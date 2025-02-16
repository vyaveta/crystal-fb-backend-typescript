import express from "express"
import { uploadImages } from "../controllers/upload"
import { imageUploadMiddleware } from "../middlewares/image-upload"

const uploadRouter = express.Router()

uploadRouter.post("/upload-images",imageUploadMiddleware, uploadImages)

export default uploadRouter