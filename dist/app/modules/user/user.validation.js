"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserValidation = joi_1.default.object({
    id: joi_1.default.string().required().messages({
        'any.required': 'User ID is required',
        'string.empty': 'User ID cannot be empty',
    }),
    password: joi_1.default.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
    needPassword: joi_1.default.boolean().required().messages({
        'any.required': 'NeedPassword is required',
    }),
    role: joi_1.default.string()
        .valid('admin', 'student', 'faculity')
        .required()
        .messages({
        'any.only': 'Role must be admin, student or faculity',
        'any.required': 'Role is required',
    }),
    status: joi_1.default.string()
        .valid('in-progress', 'blocked')
        .required()
        .messages({
        'any.only': 'Status must be in-progress or blocked',
    }),
    isDelete: joi_1.default.boolean().required().messages({
        'boolean.base': 'isDelete must be boolean',
    }),
    createAt: joi_1.default.string().isoDate().required().messages({
        'string.isoDate': 'createAt must be a valid ISO date',
    }),
});
