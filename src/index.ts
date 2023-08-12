import express from "express";
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
const userRouter = require('./routes/user.ts')

dotenv.config()

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors({
    credentials: true
}))
app.use(compression())
app.use(cookieParser())
app.use(express.json()) 
// app.use(bodyParser.json())

app.options("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With, X-Timezone-Offset, Timezone-Central"
    );
    res.sendStatus(200);
});

app.use("/", userRouter )


const server = http.createServer(app)
server.listen(PORT, () => console.log(`server running on http://localhost:8080`))


mongoose.Promise = Promise
mongoose.connect(process.env.DATABASE_URL)
mongoose.connection.on("error", (error: Error) => console.log("[MONGODB_CONNECTION]", error))
mongoose.connection.on("connected", () => console.log("db connection success"))

