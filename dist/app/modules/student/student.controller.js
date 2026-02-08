"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_service_1 = require("./student.service");
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
// ✅ Clean logic
const getAllStudents = (0, catchAsync_1.default)(async (req, res) => {
    const result = await student_service_1.studentService.getAllStudents();
    res.status(200).json({
        success: true,
        message: 'All students retrieved successfully',
        data: result,
    });
});
// ✅ Route parameter handling
const getSingleStudent = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await student_service_1.studentService.getSingleStudent(id);
    res.status(200).json({
        success: true,
        message: 'Single student retrieved successfully',
        data: result,
    });
});
exports.studentController = {
    getAllStudents,
    getSingleStudent,
};
