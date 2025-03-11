import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
// used for giving acess to public or global files or folder to the server saved in user
app.use(cookieParser())
// user k side saved cookies jo sirf server acess kar sakta hai  

export {app};