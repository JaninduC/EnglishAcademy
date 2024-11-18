import express from "express";

import SessionService from "../services/SessionService";
import {connectToDatabase} from "../util/db";
import {authenticateJWT} from "./VideoController"; SessionService;

const SessionController = express.Router();


let result =  SessionService.verifyLogin('');

export default SessionController;
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'JWT-night-owl-5867';

const { MongoClient } = require('mongodb');



const findUserByEmail = async (email: string): Promise<boolean> => {
    try {
        const db = await connectToDatabase(); // Get the global DB instance
        const usersCollection = db.collection('users'); // Access the 'users' collection
        const user = await usersCollection.findOne({ email });

        if (user) {

            // console.log('User found:', user);
            return true;
        } else {
            // console.log('No user found with email:', email);
            return false;
        }
    } catch (error) {
        console.error('Error during database operation:', error);
        return false;
    }
};

SessionController.post('/validate-email', async (req, res) => {
    const {email} = req.body;

    // Check if the email exists in the system
    if (await findUserByEmail(email)) {
        // Generate a JWT token

        const token = jwt.sign({email}, SECRET_KEY, {expiresIn: '1h'}); // Token expires in 1 hour
        return res.json({success: true, token, code: 200});
    }

    return res.status(401).json({success: false, message: 'Email not recognized.'});
});
SessionController.get('/tokenValidator',authenticateJWT , (req, res) => {
    console.log("token valid  ")
return res.json({valid:true});
});
