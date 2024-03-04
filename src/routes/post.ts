import { createPost } from "controllers/post"
import express from "express"
import { authUser } from "middlewares/auth"

const router = express.Router()

router.post("/create-post", authUser, createPost)


module.exports = router