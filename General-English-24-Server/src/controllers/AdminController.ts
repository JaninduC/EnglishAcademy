import express, { Request, Response } from "express";
import UserService from "../services/UserService";

const adminController = express.Router();

adminController.get('/users', async (req: Request, res: Response) => {
  try{
    const users = await UserService.getAll();
    res.status(200).json({ users: users, count: users.length });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

adminController.post('/user', async (req: Request, res: Response) => {
  try {
    if (req.body) {
      const user = await UserService.registerUser(req.body);
      user
       ? res.status(201).json({ success: true, message: 'User registered successfully', user: user })
        : res.status(400).json({ success: false, message: 'Failed to register user' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid request body' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminController.put('/user/:id', async (req: Request, res: Response) => {
  try{
    if(req.body){
      await UserService.updateUser(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'User updated successfully' });
    }else{
      res.status(400).json({ success: false, message: 'No data provided' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminController.delete('/user/:id', async (req: Request, res: Response) => {
  try{
    await UserService.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default adminController;
