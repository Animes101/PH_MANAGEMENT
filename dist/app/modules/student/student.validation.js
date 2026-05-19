"use strict";
// import Joi from 'joi';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentSchema = exports.createStudentSchema = void 0;
// const guardianSchema = Joi.object({
//   fatherName: Joi.string().required(),
//   motherName: Joi.string().required(),
//   phone: Joi.string().required(),
// });
// export const createStudentSchema = Joi.object({
//   studentData: Joi.object({
//     name: Joi.string().min(3).max(50).required(),
//     age: Joi.number().min(1).max(100).required(),
//     gender: Joi.string()
//       .valid('MALE', 'FEMALE', 'OTHER')
//       .required(),
//     dateOfBirth: Joi.string()
//       .required(),
//     bloodGroup: Joi.string()
//       .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
//       .required(),
//     address: Joi.string().required(),
//     grade: Joi.string()
//       .valid('A', 'B', 'C', 'D', 'F')
//       .required(),
//     email: Joi.string().email().required(),
//     phoneNumber: Joi.string()
//       .required(),
//     guardian: guardianSchema.required(),
//     department: Joi.string().required(),
//     isDelete: Joi.boolean().required(),
//     isActive: Joi.string()
//       .valid('active', 'inactive')
//       .required(),
//       admisonSemester: Joi.string().required()
//   }).required(),
// });
const joi_1 = __importDefault(require("joi"));
const guardianSchema = joi_1.default.object({
    fatherName: joi_1.default.string().min(2).max(50).required(),
    motherName: joi_1.default.string().min(2).max(50).required(),
    phone: joi_1.default.string()
        .pattern(/^[0-9]{11}$/)
        .required(),
});
exports.createStudentSchema = joi_1.default.object({
    studentData: joi_1.default.object({
        name: joi_1.default.string().min(3).max(50).required(),
        age: joi_1.default.number().integer().min(1).max(100).required(),
        gender: joi_1.default.string()
            .valid("MALE", "FEMALE", "OTHER")
            .required(),
        dateOfBirth: joi_1.default.date().iso().required(),
        bloodGroup: joi_1.default.string()
            .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
            .required(),
        address: joi_1.default.string().min(3).required(),
        grade: joi_1.default.string().valid("A", "B", "C", "D", "F").required(),
        email: joi_1.default.string().email().required(),
        phoneNumber: joi_1.default.string()
            .pattern(/^[0-9]{11}$/)
            .required(),
        guardian: guardianSchema.required(),
        department: joi_1.default.string().required(),
        isDelete: joi_1.default.boolean().required(),
        isActive: joi_1.default.string()
            .valid("active", "inactive")
            .required(),
        admisonSemester: joi_1.default.string().required(),
    }).required(),
});
const gurdianUpdaate = joi_1.default.object({
    fatherName: joi_1.default.string().required().optional(),
    motherName: joi_1.default.string().required().optional(),
    phone: joi_1.default.string()
        .pattern(/^[0-9]{11}$/)
        .required().optional(),
});
exports.updateStudentSchema = joi_1.default.object({
    studentData: joi_1.default.object({
        name: joi_1.default.string().min(3).max(50).optional(),
        age: joi_1.default.number().integer().min(1).max(100).optional(),
        gender: joi_1.default.string()
            .valid('MALE', 'FEMALE', 'OTHER')
            .optional(),
        dateOfBirth: joi_1.default.string()
            .isoDate()
            .optional(),
        bloodGroup: joi_1.default.string()
            .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
            .optional(),
        address: joi_1.default.string().optional(),
        grade: joi_1.default.string()
            .valid('A', 'B', 'C', 'D', 'F')
            .optional(),
        email: joi_1.default.string().email().optional(),
        phoneNumber: joi_1.default.string()
            .pattern(/^[0-9]{11}$/)
            .optional(),
        guardian: gurdianUpdaate.optional(),
        department: joi_1.default.string().optional(),
        isDelete: joi_1.default.boolean().optional().messages({
            'boolean.base': 'isDelete must be boolean',
        }),
        isActive: joi_1.default.string()
            .valid('active', 'inactive')
            .optional(),
        admisonSemester: joi_1.default.string().optional(),
    }).optional(),
});
