"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeacherValidaion = exports.createTeacherValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTeacherValidation = joi_1.default.object({
    name: joi_1.default.string().required(),
    age: joi_1.default.number().required(),
    gender: joi_1.default.string()
        .valid("MALE", "FEMALE", "OTHER")
        .required(),
    dateOfBirth: joi_1.default.string().required(),
    bloodGroup: joi_1.default.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .required(),
    email: joi_1.default.string().email().required(),
    phoneNumber: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    designation: joi_1.default.string().required(),
    department: joi_1.default.string().required(), // ObjectId string
    isActive: joi_1.default.string()
        .valid("active", "inactive")
        .optional(),
    isDelete: joi_1.default.boolean().optional(),
});
exports.updateTeacherValidaion = joi_1.default.object({
    name: joi_1.default.string().optional(),
    age: joi_1.default.number().optional(),
    gender: joi_1.default.string()
        .valid("MALE", "FEMALE", "OTHER")
        .optional(),
    dateOfBirth: joi_1.default.string().optional(),
    bloodGroup: joi_1.default.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .optional(),
    email: joi_1.default.string().email().optional(),
    phoneNumber: joi_1.default.string().optional(),
    address: joi_1.default.string().optional(),
    designation: joi_1.default.string().optional(),
    department: joi_1.default.string().optional(),
});
