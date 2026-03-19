"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
// const registerUser = async (payload: TUser) => {
//   const isUserExist = await UserModel.findOne({ email: payload.email });
//   if (isUserExist) {
//     throw new AppError("User already exists", 409);
//   }
//   const user = await UserModel.create(payload);
//   return user;
// };
const loginUser = async (payload) => {
    const user = await user_model_1.UserModel.findOne({ id: payload.id }).select("+password");
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
    return user;
};
exports.AuthService = {
    loginUser,
};
