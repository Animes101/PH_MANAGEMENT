"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidation = exports.createRegistrationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Registation_comntance_1 = require("./Registation.comntance");
const objectIdPattern = /^[0-9a-fA-F]{24}$/;
exports.createRegistrationValidation = joi_1.default.object({
    academinSemister: joi_1.default.string()
        .pattern(objectIdPattern)
        .required()
        .messages({
        "string.pattern.base": "Invalid Academic Semester ObjectId",
        "any.required": "Academic Semester is required",
    }),
    status: joi_1.default.string()
        .valid(...Registation_comntance_1.registerStatus)
        .optional(),
    startDate: joi_1.default.date()
        .required()
        .messages({
        "date.base": "Start date must be a valid date",
        "any.required": "Start date is required",
    }),
    endDate: joi_1.default.date()
        .required()
        .greater(joi_1.default.ref("startDate"))
        .messages({
        "date.base": "End date must be a valid date",
        "date.greater": "End date must be greater than start date",
        "any.required": "End date is required",
    }),
    minCredit: joi_1.default.number()
        .required()
        .messages({
        "number.base": "Min credit must be a number",
        "any.required": "Min credit is required",
    }),
    maxCredit: joi_1.default.number()
        .required()
        .greater(joi_1.default.ref("minCredit"))
        .messages({
        "number.base": "Max credit must be a number",
        "number.greater": "Max credit must be greater than min credit",
        "any.required": "Max credit is required",
    }),
});
exports.updateValidation = joi_1.default.object({
    academinSemister: joi_1.default.string()
        .pattern(objectIdPattern)
        .messages({
        "string.pattern.base": "Invalid Academic Semester ObjectId",
        "any.required": "Academic Semester is required",
    }),
    status: joi_1.default.string()
        .valid(...Registation_comntance_1.registerStatus)
        .optional(),
    startDate: joi_1.default.date()
        .messages({
        "date.base": "Start date must be a valid date",
        "any.required": "Start date is required",
    }),
    endDate: joi_1.default.date()
        .greater(joi_1.default.ref("startDate"))
        .messages({
        "date.base": "End date must be a valid date",
        "date.greater": "End date must be greater than start date",
        "any.required": "End date is required",
    }),
    minCredit: joi_1.default.number()
        .messages({
        "number.base": "Min credit must be a number",
        "any.required": "Min credit is required",
    }),
    maxCredit: joi_1.default.number()
        .greater(joi_1.default.ref("minCredit"))
        .messages({
        "number.base": "Max credit must be a number",
        "number.greater": "Max credit must be greater than min credit",
        "any.required": "Max credit is required",
    }),
});
