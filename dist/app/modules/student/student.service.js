"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const student_model_1 = require("./student.model");
const getAllStudents = async () => {
    const result = await student_model_1.StudentModel.find().populate('admisonSemester').populate('user');
    return result;
};
const getSingleStudent = async (_id) => {
    const result = await student_model_1.StudentModel.findOne({ _id });
    return result;
};
const deleteStudent = async (id) => {
    // 1️⃣ find student by custom id
    const student = await student_model_1.StudentModel.findOne({ id });
    if (!student) {
        throw new AppError_1.default("Student not found", 404);
    }
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // 2️⃣ get user _id from student
        const userId = student.user;
        // 3️⃣ soft delete both
        const result1 = await user_model_1.UserModel.findByIdAndUpdate(userId, { isDelete: true }, { new: true, session });
        if (!result1) {
            throw new AppError_1.default('Failed to delete user', 400);
        }
        const result2 = await student_model_1.StudentModel.findOneAndUpdate({ id }, { isDelete: true }, { new: true, session });
        if (!result2) {
            throw new AppError_1.default('Failed to delete student', 400);
        }
        await session.commitTransaction();
        await session.endSession();
        return [result1, result2];
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError_1.default("Failed to delete student", 500);
    }
};
const updateStudentintoDb = async (id, payload) => {
    console.log(id, payload);
    const result = await student_model_1.StudentModel.findOneAndUpdate({ id }, payload);
    return result;
};
exports.studentService = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudentintoDb
};
