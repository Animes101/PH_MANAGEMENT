"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignFacultiesValidation = exports.createCourseValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCourseValidationSchema = joi_1.default.object({
    title: joi_1.default.string().trim().required().messages({
        "string.empty": "Title is required",
    }),
    prefix: joi_1.default.string().required().messages({
        "string.empty": "Prefix is required",
    }),
    code: joi_1.default.number().required().messages({
        "number.base": "Code must be a number",
    }),
    isDelete: joi_1.default.boolean().default(false),
    preRequisiteCorse: joi_1.default.array().items(joi_1.default.object({
        corse: joi_1.default.string().required().messages({
            "string.empty": "Course ID is required",
        }),
        isDelete: joi_1.default.boolean().default(false),
    })),
});
exports.assignFacultiesValidation = joi_1.default.object({
    faculties: joi_1.default.array()
        .items(joi_1.default.string().required().messages({
        "string.base": "Faculty id must be a string",
    }))
        .required()
        .messages({
        "array.base": "Faculties must be an array",
        "any.required": "Faculties are required",
    }),
});
