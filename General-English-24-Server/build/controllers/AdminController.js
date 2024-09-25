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
const adminController = express_1.default.Router();
adminController.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserService_1.default.getAll();
        res.status(200).json({ users: users, count: users.length });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
adminController.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            const user = yield UserService_1.default.registerUser(req.body);
            user
                ? res.status(201).json({ success: true, message: 'User registered successfully', user: user })
                : res.status(400).json({ success: false, message: 'Failed to register user' });
        }
        else {
            res.status(400).json({ success: false, message: 'Invalid request body' });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}));
adminController.put('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            yield UserService_1.default.updateUser(req.params.id, req.body);
            res.status(200).json({ success: true, message: 'User updated successfully' });
        }
        else {
            res.status(400).json({ success: false, message: 'No data provided' });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}));
adminController.delete('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserService_1.default.deleteUser(req.params.id);
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}));
exports.default = adminController;
