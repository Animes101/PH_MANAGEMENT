"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_service_1 = require("./student.service");
const getAllStudents = async (req, res) => {
    const result = await student_service_1.studentService.getAllStudents();
    res.status(200).json({
        success: true,
        message: 'All students retrieved successfully',
        data: result,
    });
};
const getSingleStudent = async (req, res) => {
    const { _id } = req.params;
    const result = await student_service_1.studentService.getSingleStudent(_id);
    res.status(200).json({
        success: true,
        message: "Single student retrieved successfully",
        data: result
    });
};
exports.studentController = {
    getAllStudents,
    getSingleStudent,
};
