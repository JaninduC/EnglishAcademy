import express, { Request, Response } from "express";

const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');``


const videoController = express.Router();
videoController.get('/test',(req, res) => {
    res.status(200).json({ message: 'GET request received' });
    console.log("working")
});
videoController.get('/videos/:folder/:file', (req, res) => {
    console.log(__dirname)
    const externalFolderPath = 'C:\\Users\\User\\OneDrive\\Desktop\\English\\new Repo\\videos'; // Absolute path to the external folder
    const videoPath = path.join(externalFolderPath, req.params.folder, req.params.file); // Building the path to the video

    // const videoPath = path.join(__dirname, '','./videos/'+ req.params.folder, req.params.file);
    console.log( req.params.folder);
    res.sendFile(videoPath);
});


export default videoController;