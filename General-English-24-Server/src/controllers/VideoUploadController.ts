import express from "express";
import path from "node:path";
import * as fs from "node:fs";
import multer from "multer";
import ffmpeg from 'fluent-ffmpeg';

const videoUploadController = express.Router();

// Set up storage for video uploads
const storage = multer.diskStorage({
    destination: './videos',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });
videoUploadController.use(express.static('public')); // For serving static files like HTML, JS

videoUploadController.post('/upload', upload.single('video'), (req, res) => {
    if (req.file) {
        const videoPath = req.file.path;
        const outputFolder = path.join('C:\\Users\\User\\OneDrive\\Desktop\\English\\new Repo\\videos', path.parse(req.file.filename).name); // Create a folder for the converted files

        // Create output directory if it doesn't exist
        fs.mkdirSync(outputFolder, { recursive: true });

        // Convert video to HLS format
        ffmpeg(videoPath)
            .output(path.join(outputFolder, 'index.m3u8'))
            .outputOptions([
                '-codec: copy', // Keeps the original codec to avoid unnecessary encoding
                '-start_number 0', // Set the start number of the .ts files
                '-hls_time 10', // Each segment is 10 seconds long
                '-hls_list_size 0', // Unlimited .ts files in the .m3u8 playlist
                '-f hls' // Output format is HLS
            ])
            .on('end', () => {
                // Delete the original mp4 file after conversion
                fs.unlink(videoPath, (err) => {
                    if (err) {
                        console.error('Error deleting original file:', err);
                    } else {
                        console.log('Original video file deleted successfully');
                    }
                });
                res.send({
                    message: 'Video uploaded and converted successfully',
                    file: req.file,
                    outputPath: outputFolder
                });
            })
            .on('error', (err) => {
                console.error('Error during conversion:', err);
                res.status(500).send({ message: 'Error during video conversion.' });
            })
            .run();
    } else {
        res.status(400).send({ message: 'Error: No video file uploaded.' });
    }
});

export default videoUploadController;








// import express from "express";
// import path from "node:path";
// import * as fs from "node:fs";
// import multer from "multer";
// import ffmpeg from 'fluent-ffmpeg';
// const videoUploadController = express.Router();
//
//
// // Set up storage for video uploads
// const storage = multer.diskStorage({
//     destination: './videos',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({ storage });
// videoUploadController.use(express.static('public')); // For serving static files like HTML, JS
// videoUploadController.post('/upload', upload.single('video'), (req, res) => {
//     if (req.file) {
//         const videoPath = req.file.path;
//         res.send({
//             message: 'Video uploaded successfully!',
//             file: req.file
//         });
//
//
//
//     const outputFolder = `./videos/${path.parse(req.file.filename).name}`;
//
//     // Convert video to HLS format
//     ffmpeg(videoPath)
//         .output(`${outputFolder}/index.m3u8`)
//         .outputOptions([
//             '-codec: copy',
//             '-start_number 0',
//             '-hls_time 10',
//             '-hls_list_size 0',
//             '-f hls'
//         ])
//         .on('end', () => {
//             res.send('Video uploaded and converted successfully');
//         })
//         .run();
//     } else {
//         res.status(400).send({ message: 'Error: No video file uploaded.' });
//     }
// });
//
// export default videoUploadController;
//
//
// // // Specify the directory for storing videos
// // const videoStoragePath = path.join(__dirname, 'videos');
// // if (!fs.existsSync(videoStoragePath)) {
// //     fs.mkdirSync(videoStoragePath, { recursive: true });
// // }
// //
// // // Set up storage for video uploads
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         console.log("Video StoragePath"+videoStoragePath);
// //         cb(null, videoStoragePath); // Videos will be stored in the 'videos' folder
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + '-' + file.originalname); // Unique file names
// //     }
// // });
// //
// // const upload = multer({ storage });
//
// // videoUploadController.post('/upload', upload.single('video'), (req, res) => {
//
// //     let videoPath="";
// //     let outputFolder=""
// //     if (req.file) {
// //          videoPath = req.file.path;
// //          outputFolder = `${videoPath}-hls`; // Store the HLS output separately
// //         res.send({
// //             message: 'Video uploaded successfully!',
// //             file: req.file
// //         });
// //     } else {
// //         res.status(400).send({ message: 'Error: No video file uploaded.' });
// //     }
// //     console.log("video path "+videoPath);
// //     console.log("outputFolder "+outputFolder);
// //     // Convert the video to HLS format
// //     ffmpeg(videoPath)
// //         .output(`${outputFolder}/index.m3u8`)
// //         .outputOptions([
// //             '-codec: copy',
// //             '-start_number 0',
// //             '-hls_time 10',
// //             '-hls_list_size 0',
// //             '-f hls'
// //         ])
// //         .on('end', () => {
// //             res.send('Video uploaded and converted to HLS format');
// //         })
// //         .run();
// //
// // });