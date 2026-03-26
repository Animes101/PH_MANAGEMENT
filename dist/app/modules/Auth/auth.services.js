"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../utils/sendEmail");
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
    const accessToken = (0, auth_utils_1.createToken)(jowPayload, config_1.default.JWT_ACCESS_TOKEN, '10d');
    const refressToken = (0, auth_utils_1.createToken)(jowPayload, config_1.default.JWT_ACCESS_TOKEN, '365d');
    return {
        accessToken,
        refressToken,
        needPasswordChange: true,
    };
};
const changePassword = async (newPassword, oldPassword, 
// এখানে iat: number যোগ করা হয়েছে
authUser) => {
    const user = await user_model_1.UserModel.isUserExistsById(authUser.userId);
    // এখন TypeScript আর এরর দিবে না
    const { iat } = authUser;
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
    if (user.passwordChangeAt &&
        await user_model_1.UserModel.isJWTIssuBeforePasswordChange(user.passwordChangeAt, iat)) {
        throw new AppError_1.default('Your access token is invalid', 401);
    }
    // ✅ new password hash
    const saltRounds = 12;
    const hashedPassword = await bcrypt_1.default.hash(newPassword, saltRounds);
    // ✅ update password
    const result = await user_model_1.UserModel.findOneAndUpdate({ id: user.id }, {
        password: hashedPassword,
        needPassword: false,
        passwordChangeAt: new Date()
    }, {
        new: true,
    });
    return result;
};
const accessToken = async (token) => {
    if (!token) {
        throw new AppError_1.default("Forbidden access: No token provided", 403);
    }
    // ✅ Bearer token split
    if (!token) {
        throw new AppError_1.default("Forbidden access: Invalid token format", 403);
    }
    // ✅ verify token
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_ACCESS_TOKEN);
    const { userId } = decoded;
    const user = await user_model_1.UserModel.isUserExistsById(userId);
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    else if (user?.isDelete === true) {
        throw new AppError_1.default('user alredy Dele thi data base', 402);
    }
    const jowPayload = {
        userId: user.id,
        userRole: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jowPayload, config_1.default.JWT_ACCESS_TOKEN, '10d');
    return accessToken;
};
const forgetPawword = async (id) => {
    const user = await user_model_1.UserModel.isUserExistsById(id);
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    else if (user?.isDelete === true) {
        throw new AppError_1.default('user alredy Delete this data base', 402);
    }
    const jowPayload = {
        userId: user.id,
        userRole: user.role,
    };
    const resetToken = (0, auth_utils_1.createToken)(jowPayload, config_1.default.JWT_ACCESS_TOKEN, '10d');
    const restLink = `http://localhost:5000/api/v1?id=${user.id}&token=${resetToken}`;
    const result = (0, sendEmail_1.sendEmail)(user?.email, restLink);
    return result;
};
const resetPassword = async (id, newPassword, tokenUser) => {
    const user = await user_model_1.UserModel.isUserExistsById(id);
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    else if (user?.isDelete === true) {
        throw new AppError_1.default('user alredy Delete this data base', 402);
    }
    if (user.id !== tokenUser?.userId) {
        throw new AppError_1.default('you are not Valid User', 403);
    }
    // ✅ new password hash
    const saltRounds = 12;
    const hashedPassword = await bcrypt_1.default.hash(newPassword, saltRounds);
    const result = await user_model_1.UserModel.findOneAndUpdate({ id: user?.id }, { password: hashedPassword, passwordChangeAt: new Date() }, { new: true });
    return result;
};
exports.AuthService = {
    loginUser,
    changePassword,
    accessToken,
    forgetPawword,
    resetPassword
};
