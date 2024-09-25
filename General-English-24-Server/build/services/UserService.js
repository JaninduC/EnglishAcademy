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
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    verifyLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email: email, password: password });
            if (user)
                return true;
            return false;
        });
    },
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedUser = yield new User_1.default(user).save();
            return savedUser;
        });
    },
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // get all users without passwords
            const users = yield User_1.default.find({}, "-password");
            return users;
        });
    },
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email: email }, "-password");
            if (user)
                return user;
            return null;
        });
    },
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const u = yield User_1.default.findById(id);
            if (u)
                yield User_1.default.findByIdAndUpdate(id, user, { new: true });
            else
                throw new Error('User not found');
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const u = yield User_1.default.findById(id);
            if (u)
                yield User_1.default.findByIdAndDelete(id);
            else
                throw new Error('User not found');
        });
    },
};
