"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterValidationSchem = void 0;
const joi_1 = __importDefault(require("joi"));
exports.academicSemesterValidationSchem = joi_1.default.object({
    data: joi_1.default.object({
        name: joi_1.default.string().valid('Autumn', 'Summer', 'Fall').required(),
        code: joi_1.default.string().valid('01', '02', '03', '04').required(),
        year: joi_1.default.number().integer().required(),
        startMonth: joi_1.default.string().valid('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December').required(),
        endMonth: joi_1.default.string().valid('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December').required()
    }).required()
});
