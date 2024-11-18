import express, { Express,Request,Response } from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import userController from "./controllers/UserController";
import adminController from './controllers/AdminController'
import cors from 'cors';
import videoController from "./controllers/VideoController";
import videoUploadController from "./controllers/VideoUploadController";
import SessionController from "./controllers/SessionController";
import {connectToDatabase} from "./util/db";
require('dotenv').config();
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use('/user',userController)
app.use('/admin',adminController)
app.use('/video',videoController)
app.use('/videoUpload',videoUploadController)
app.use('/session',SessionController)
app.listen(3000,()=>{
  console.log('Server Started at Port 3000!')
})
const test=connectToDatabase();


