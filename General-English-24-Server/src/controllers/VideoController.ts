import express, { response,request } from "express";
const jwt = require('jsonwebtoken');
const path = require('path');

const videoController = express.Router();
export const authenticateJWT = (req : any, res: any, next : any) => {
    const authHeader = req.headers.authorization; // Get the token from the Authorization header
    console.log("jwt")
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]; // Extract the token
        const secretKey = 'JWT-night-owl-5867';

        jwt.verify(token, secretKey, (err: any, user: any) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
            }
            req.user = user; // Attach the user information to the request
            next();
        });
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};
videoController.get('/test',(req, res) => {
    res.status(200).json({ message: 'GET request received' });
    console.log("working")
});
videoController.get('/videos/:folder/:file',authenticateJWT , (req, res) => {
    console.log(__dirname)
    const externalFolderPath = 'C:\\Users\\User\\OneDrive\\Desktop\\English\\new Repo\\videos';// local path
    // const externalFolderPath = '/home/ubuntu/www/newVideo/'; // Server path.
    const videoPath = path.join(externalFolderPath, req.params.folder, req.params.file); // Building the path to the video

    // const videoPath = path.join(__dirname, '','./videos/'+ req.params.folder, req.params.file);
    console.log( req.params.folder);
    res.sendFile(videoPath);
});

export default videoController;