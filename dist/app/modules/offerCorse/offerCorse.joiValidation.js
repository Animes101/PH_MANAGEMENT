"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOfferCourseValidation = exports.createOfferCourseValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
// custom ObjectId validator
const objectId = (value, helpers) => {
    if (!mongoose_1.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid ObjectId");
    }
    return value;
};
exports.createOfferCourseValidation = joi_1.default.object({
    registationSementer: joi_1.default.string()
        .required()
        .custom(objectId),
    academinFacaulty: joi_1.default.string()
        .required()
        .custom(objectId),
    corse: joi_1.default.string()
        .required()
        .custom(objectId),
    teacher: joi_1.default.string()
        .required()
        .custom(objectId),
    maxCapacity: joi_1.default.number()
        .required()
        .min(1),
    minCapacity: joi_1.default.number()
        .required()
        .min(1),
    days: joi_1.default.string()
        .valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday')
        .required(),
    startTime: joi_1.default.string()
        .required()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .messages({
        "string.pattern.base": "startTime must be in HH:MM format",
        "any.required": "startTime is required",
    }),
    endTime: joi_1.default.string()
        .required()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .messages({
        "string.pattern.base": "endTime must be in HH:MM format",
        "any.required": "endTime is required",
    }),
});
exports.updateOfferCourseValidation = joi_1.default.object({
    registationSementer: joi_1.default.string().custom(objectId),
    academinSementer: joi_1.default.string().custom(objectId),
    academinFacaulty: joi_1.default.string().custom(objectId),
    corse: joi_1.default.string().custom(objectId),
    teacher: joi_1.default.string().custom(objectId),
    maxCapacity: joi_1.default.number().min(1),
    minCapacity: joi_1.default.number().min(1),
    days: joi_1.default.string().valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday'),
    startTime: joi_1.default.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
    endTime: joi_1.default.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
});
