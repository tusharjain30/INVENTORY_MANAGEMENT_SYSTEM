import express from "express"
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routers/userRouter.js"
import QRCodeRouter from "./routers/QRCodeRouter.js"
const app = express();

config({
    path: '.env'
})

app.use(cors({
    origin: process.env.FRONT_END_URL,
    method: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}))


app.use('/api/v1/user', userRouter)
app.use('/api/v1/QrCode', QRCodeRouter)


connectDB()
app.use(errorMiddleware)

export default app;