import express, { Express,Request,Response } from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import userController from "./controllers/UserController";
import adminController from './controllers/AdminController'
import cors from 'cors';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use('/user',userController)
app.use('/admin',adminController)

app.listen(3000,()=>{
  console.log('Server Started at Port 3000!')
})

mongoose.connect(process.env.DB_URI as string)
.then(()=>{
  console.log("Connected to database!")
}).catch((er)=>{
  console.log("Something went wrong! : "+er)
})



