"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Username is required!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
    },
    password: {
        type: String
    },
    nic: {
        type: String,
        required: [true, "NIC number is required!"],
        unique: true,
    },
    mobileNumber: {
        type: String,
        required: [true, "Mobile number is required!"],
        unique: true,
    },
    district: {
        type: String,
        required: [true, "District is required!"],
    }
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
