"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.loginValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginValidation = joi_1.default.object({
    body: joi_1.default.object({
        id: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }),
});
exports.changePassword = joi_1.default.object({
    oldpassword: joi_1.default.string().required(),
    newpassword: joi_1.default.string().required(),
});
