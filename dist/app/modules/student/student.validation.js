"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const guardianSchema = joi_1.default.object({
    fatherName: joi_1.default.string().required(),
    motherName: joi_1.default.string().required(),
    phone: joi_1.default.string()
        .pattern(/^[0-9]{11}$/)
        .required(),
});
exports.createStudentSchema = joi_1.default.object({
    studentData: joi_1.default.object({
        name: joi_1.default.string().min(3).max(50).required(),
        age: joi_1.default.number().integer().min(1).max(100).required(),
        gender: joi_1.default.string()
            .valid('MALE', 'FEMALE', 'OTHER')
            .required(),
        dateOfBirth: joi_1.default.string()
            .isoDate()
            .required(),
        bloodGroup: joi_1.default.string()
            .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
            .required(),
        address: joi_1.default.string().required(),
        grade: joi_1.default.string()
            .valid('A', 'B', 'C', 'D', 'F')
            .required(),
        email: joi_1.default.string().email().required(),
        phoneNumber: joi_1.default.string()
            .pattern(/^[0-9]{11}$/)
            .required(),
        guardian: guardianSchema.required(),
        department: joi_1.default.string().required(),
        isActive: joi_1.default.string()
            .valid('active', 'inactive')
            .required(),
        admisonSemester: joi_1.default.string().required()
    }).required(),
});
