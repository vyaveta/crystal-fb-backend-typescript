import express from "express";
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
const fileUpload = require("express-fileupload")
const userRouter = require('./routes/user.ts')
import uploadRouter from "./routes/upload"

dotenv.config()

const PORT = process.env.PORT || 9090

const app = express()

app.use(cors({
    credentials: true
}))
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(fileUpload({
    useTempfiles: true,
}
))

app.options("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With, X-Timezone-Offset, Timezone-Central"
    );
    res.sendStatus(200);
});

app.use("/", userRouter)
app.use("/upload", uploadRouter)


const server = http.createServer(app)
server.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))


mongoose.Promise = Promise
mongoose.connect(process.env.DATABASE_URL)
mongoose.connection.on("error", (error: Error) => console.log("[MONGODB_CONNECTION]", error))
mongoose.connection.on("connected", () => console.log("db connection success"))