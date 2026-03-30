"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolCourseStudentJoi = exports.enrolCourseMarkJoi = void 0;
const joi_1 = __importDefault(require("joi"));
exports.enrolCourseMarkJoi = joi_1.default.object({
    classTest1: joi_1.default.number().required(),
    classTest2: joi_1.default.number().required(),
    classTest3: joi_1.default.number().required(),
    midTerm: joi_1.default.number().required(),
    finalExam: joi_1.default.number().required(),
});
exports.enrolCourseStudentJoi = joi_1.default.object({
    semesterRegistration: joi_1.default.string().required(),
    academinSemester: joi_1.default.string().required(),
    academicDepartment: joi_1.default.string().required(),
    offerCorse: joi_1.default.string().required(),
    corse: joi_1.default.string().required(),
    student: joi_1.default.string().required(),
    faculity: joi_1.default.string().required(),
    isEnrollerd: joi_1.default.boolean().default(false),
    corseMark: exports.enrolCourseMarkJoi.required(),
    grade: joi_1.default.string()
        .valid("A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F")
        .required(),
    isComplated: joi_1.default.boolean().default(false),
});
