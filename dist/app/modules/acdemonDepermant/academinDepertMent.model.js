"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academinDepertModel = exports.academinSchema = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
exports.academinSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    academinFacality: { type: mongoose_1.Schema.Types.ObjectId, ref: "AcademicFaculty", required: true },
}, { timestamps: true });
exports.academinSchema.pre('save', async function () {
    // Example pre-save hook logic
    const existingDepartment = await exports.academinDepertModel.findOne({ name: this.name });
    if (existingDepartment) {
        throw new AppError_1.default("A department with this name already exists", 400);
    }
});
exports.academinDepertModel = (0, mongoose_1.model)('AcademinDepartment', exports.academinSchema);
