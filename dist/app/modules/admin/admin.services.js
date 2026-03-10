"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const queryBuilder_1 = __importDefault(require("../../queryBuilder/queryBuilder"));
const admin_model_1 = require("./admin.model");
const user_model_1 = require("../user/user.model");
const getAllAdminfromBd = async (query) => {
    const queryBuilder = new queryBuilder_1.default(admin_model_1.adminModel.find(), query);
    const admins = await queryBuilder
        .search(['name', 'email'])
        .filter()
        .sort()
        .pagination()
        .fields()
        .modelQuery;
    return admins;
};
const deleteAdmin = async (_id) => {
    // 1️⃣ find admin by custom id
    const admin = await admin_model_1.adminModel.findOne({ _id });
    if (!admin) {
        throw new AppError_1.default("Admin not found", 404);
    }
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // 2️⃣ get user _id from admin
        const userId = admin.user;
        // 3️⃣ soft delete user
        const result1 = await user_model_1.UserModel.findByIdAndUpdate(userId, { isDelete: true }, { new: true, session });
        if (!result1) {
            throw new AppError_1.default("Failed to delete user", 400);
        }
        // 4️⃣ soft delete admin
        const result2 = await admin_model_1.adminModel.findOneAndUpdate({ _id }, { isDelete: true }, { new: true, session });
        if (!result2) {
            throw new AppError_1.default("Failed to delete admin", 400);
        }
        await session.commitTransaction();
        await session.endSession();
        return [result1, result2];
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError_1.default("Failed to delete admin", 500);
    }
};
const getSingleAdminFromDb = async (_id) => {
    const result = await admin_model_1.adminModel.findOne({ _id });
    return result;
};
const updateAdminfromDb = async (_id, payload) => {
    const result = await admin_model_1.adminModel.findByIdAndUpdate(_id, payload, {
        new: true
    });
    return result;
};
exports.adminServices = {
    getAllAdminfromBd,
    getSingleAdminFromDb,
    deleteAdmin,
    updateAdminfromDb
};
