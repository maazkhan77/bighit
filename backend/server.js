import express from "express";
import cors from 'cors'
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/dbConn.js";
import taskRoutes from './routes/taskRoute.js'
dotenv.config();
connectDB()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use("/api/task", taskRoutes)

app.listen(PORT,() => console.log('app is running'))