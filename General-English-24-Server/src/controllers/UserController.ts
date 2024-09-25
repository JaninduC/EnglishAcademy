import express, { Request, Response } from "express";
import User from "../models/User";
import UserService from "../services/UserService";

const userController = express.Router();

userController.post('/login', async (req: Request, res: Response) => {
  try {
    if (req.body) {
      const isVerify = await UserService.verifyLogin(req.body.email, req.body.password);
      isVerify
        ? res.status(200).json({ success: true, message: 'Logged in successfully' })
        : res.status(401).json({ success: false, message: 'Invalid email or password' });
    }else{
      res.status(400).json({ success: false, message: 'Invalid request body' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
})

// userController.post('/signup', async (req: Request, res: Response) => {
//   try {
//     if (req.body) {
//       const user = await UserService.registerUser(req.body);
//       user
//        ? res.status(201).json({ success: true, message: 'User registered successfully', user: user })
//         : res.status(400).json({ success: false, message: 'Failed to register user' });
//     } else {
//       res.status(400).json({ success: false, message: 'Invalid request body' });
//     }
//   } catch (err: any) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// })

userController.post('/check-user', async (req: Request, res: Response) => {
  try{
    const user = await UserService.getUserByEmail(req.body.email as string);
    if(user){
      res.status(200).json({ isExist: true, message: 'User found', user });
    }else{
      res.status(404).json({ isExist: false, message: 'User not found' });
    }
  } catch (err: any) {
    res.status(500).json({ isExist: false, message: err.message });
  }
});

export default userController;
