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
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
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
exports.AuthController = {
    login,
    changePaaword
};
