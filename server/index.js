import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { route } from "./routes/resumeRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended :  true}));

app.use("/resume",route);

const DATABASE_URL =  process.env.DATABASE_CONNECTION_STRING

mongoose.connect(DATABASE_URL)
.then(()=>app.listen(PORT,()=>{ console.log(`Server running on port ${PORT}`)}))
.catch((err)=>{console.log(err.message)});