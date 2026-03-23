"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const loginUser = async (payload) => {
    const user = await user_model_1.UserModel.isUserExistsById(payload?.id);
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    else if (user?.isDelete === true) {
        throw new AppError_1.default('user alredy Dele thi data base', 402);
    }
    // 🔥 bcrypt compare
    const isPasswordMatched = await bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default("Invalid credentials", 401);
    }
    const jowPayload = {
        userId: user.id,
        userRole: user.role,
    };
    //create token json web token
    const accessToken = jsonwebtoken_1.default.sign(jowPayload, config_1.default.JWT_ACCESS_TOKEN, { expiresIn: '10d' });
    return {
        accessToken,
        needPasswordChange: true,
    };
};
const changePassword = async (newPassword, oldPassword, authUser) => {
    const user = await user_model_1.UserModel.isUserExistsById(authUser.userId);
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    if (user.isDelete) {
        throw new AppError_1.default("User is already deleted", 403);
    }
    // ✅ old password check
    const isPasswordMatched = await bcrypt_1.default.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default("Invalid credentials", 401);
    }
    // ✅ new password hash
    const saltRounds = 12;
    const hashedPassword = await bcrypt_1.default.hash(newPassword, saltRounds);
    // ✅ update password
    const result = await user_model_1.UserModel.findOneAndUpdate({ id: user.id }, {
        password: hashedPassword,
        needPassword: false,
        passwordChangeAt: new Date() // optional
    }, {
        new: true,
    });
    return result;
};
exports.AuthService = {
    loginUser,
    changePassword
};
