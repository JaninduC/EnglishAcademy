"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserService_1 = __importDefault(require("../services/UserService"));
const userController = express_1.default.Router();
userController.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            const isVerify = yield UserService_1.default.verifyLogin(req.body.email, req.body.password);
            isVerify
                ? res.status(200).json({ success: true, message: 'Logged in successfully' })
                : res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        else {
            res.status(400).json({ success: false, message: 'Invalid request body' });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}));
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
userController.post('/check-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserService_1.default.getUserByEmail(req.body.email);
        if (user) {
            res.status(200).json({ isExist: true, message: 'User found', user });
        }
        else {
            res.status(404).json({ isExist: false, message: 'User not found' });
        }
    }
    catch (err) {
        res.status(500).json({ isExist: false, message: err.message });
    }
}));
exports.default = userController;
