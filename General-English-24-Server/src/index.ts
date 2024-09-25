import express, { Express,Request,Response } from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import userController from "./controllers/UserController";
import adminController from './controllers/AdminController'
import cors from 'cors';
import videoController from "./controllers/VideoController";
import videoUploadController from "./controllers/VideoUploadController";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use('/user',userController)
app.use('/admin',adminController)
app.use('/video',videoController)
app.use('/videoUpload',videoUploadController)
app.listen(3000,()=>{
  console.log('Server Started at Port 3000!')
})
const mongoURI ='mongodb://learningUser:5By4UG3SO@13.234.231.2:27017/learning-platform?retryWrites=true&w=majority&appName=Cluster0';

    mongoose.connect(mongoURI)
.then(()=>{
  console.log("Connected to database!")
}).catch((er)=>{
  console.log("Something went wrong! : "+er)
})



