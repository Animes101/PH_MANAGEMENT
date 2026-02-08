"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const student_model_1 = require("./student.model");
const getAllStudents = async () => {
    const result = await student_model_1.StudentModel.find();
    return result;
};
const getSingleStudent = async (_id) => {
    const result = await student_model_1.StudentModel.findOne({ _id });
    return result;
};
exports.studentService = {
    getAllStudents,
    getSingleStudent,
};
