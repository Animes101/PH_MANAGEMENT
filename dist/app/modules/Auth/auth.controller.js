"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const auth_services_1 = require("./auth.services");
const login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_services_1.AuthService.loginUser(req.body.body);
    const { refressToken, accessToken, needPasswordChange } = result;
    res.cookie('refressToken', refressToken);
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            accessToken,
            needPasswordChange,
        },
    });
});
const changePaaword = (0, catchAsync_1.default)(async (req, res) => {
    const { newpassword, oldpassword } = req.body;
    const user = req.user;
    const result = await auth_services_1.AuthService.changePassword(newpassword, oldpassword, user);
    res.status(200).json({
        success: true,
        message: "password change  successful",
        data: result,
    });
});
const accessToken = (0, catchAsync_1.default)(async (req, res) => {
    const { refressToken } = req.cookies;
    const result = await auth_services_1.AuthService.accessToken(refressToken);
    res.status(200).json({
        success: true,
        message: "accces token create  successful",
        data: result,
    });
});
const forgetpaaword = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.body.id;
    const result = await auth_services_1.AuthService.forgetPawword(id);
    res.status(200).json({
        success: true,
        message: "Please check your email ",
        data: result,
    });
});
const resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.body.id;
    const newPassword = req.body.newPassword;
    const tokenUser = req.user;
    const result = await auth_services_1.AuthService.resetPassword(id, newPassword, tokenUser);
    res.status(200).json({
        success: true,
        message: "password reset success fully",
        data: result,
    });
});
exports.AuthController = {
    login,
    changePaaword,
    accessToken,
    forgetpaaword,
    resetPassword
};
