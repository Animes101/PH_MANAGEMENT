"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollCorseUpdateJoi = exports.enrolCourseStudentJoi = void 0;
const joi_1 = __importDefault(require("joi"));
exports.enrolCourseStudentJoi = joi_1.default.object({
    offerCorse: joi_1.default.string().required(),
});
exports.enrollCorseUpdateJoi = joi_1.default.object({
    student: joi_1.default.string().required(),
    semesterRegistration: joi_1.default.string().required(),
    offerCorse: joi_1.default.string().required(),
    academinSemester: joi_1.default.string().required(),
    corseMark: joi_1.default.object({
        classTest1: joi_1.default.number().min(0).max(10),
        classTest2: joi_1.default.number().min(0).max(10),
        classTest3: joi_1.default.number().min(0).max(10),
        midTerm: joi_1.default.number().min(0).max(20),
        finalExam: joi_1.default.number().min(0).max(50),
    }),
    grade: joi_1.default.string().valid('A', 'B', 'C', 'D', 'F', 'N/A'),
    isComplated: joi_1.default.boolean(),
});
