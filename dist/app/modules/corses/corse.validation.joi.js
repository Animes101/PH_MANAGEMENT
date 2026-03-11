"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseValidationSchema = void 0;
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
    preRequisiteCorse: joi_1.default.array().items(joi_1.default.object({
        corse: joi_1.default.string().required().messages({
            "string.empty": "Course ID is required",
        }),
        isDelete: joi_1.default.boolean().default(false),
    })),
});
