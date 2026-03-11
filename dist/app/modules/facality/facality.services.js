"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facalityServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const queryBuilder_1 = __importDefault(require("../../queryBuilder/queryBuilder"));
const user_model_1 = require("../user/user.model");
const facality_model_1 = require("./facality.model");
const getAllFacality = async (query) => {
    const queryBuilder = new queryBuilder_1.default(facality_model_1.TeacherModel.find(), query);
    const result = await queryBuilder
        .search(['name', 'email'])
        .filter()
        .sort()
        .pagination()
        .fields()
        .modelQuery;
    return result;
};
const getSingleFaculty = async (_id) => {
    const result = await facality_model_1.TeacherModel.findById(_id);
    return result;
};
const deleteFacalityInotBod = async (_id) => {
    // 1️⃣ find student by custom id
    const teacher = await facality_model_1.TeacherModel.findOne({ _id });
    if (!teacher) {
        throw new AppError_1.default("Facality not found", 404);
    }
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // 2️⃣ get user _id from student
        const userId = teacher.user;
        // 3️⃣ soft delete both
        const result1 = await user_model_1.UserModel.findByIdAndUpdate(userId, { isDelete: true }, { new: true, session });
        if (!result1) {
            throw new AppError_1.default('Failed to delete user', 400);
        }
        const result2 = await facality_model_1.TeacherModel.findOneAndUpdate({ _id }, { isDelete: true }, { new: true, session });
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
const updateFacalityIntoDb = async (_id, payload) => {
    console.log(payload);
    const result = await facality_model_1.TeacherModel.findByIdAndUpdate(_id, payload, {
        new: true
    });
    return result;
};
exports.facalityServices = {
    getAllFacality,
    getSingleFaculty,
    deleteFacalityInotBod,
    updateFacalityIntoDb
};
