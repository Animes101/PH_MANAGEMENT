"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
// Mongoose Schema
const GuardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    phone: { type: String, required: true },
});
const StudentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], required: true },
    dateOfBirth: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    address: { type: String, required: true },
    grade: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    guardian: { type: GuardianSchema, required: true },
    department: { type: String, required: true },
    isActive: { type: String, enum: ['active', 'inactive'], default: 'active' },
    admisonSemester: { type: mongoose_1.Schema.Types.ObjectId, ref: 'AcademicSemester' },
}, { timestamps: true } // auto adds createdAt & updatedAt
);
// Mongoose Model
exports.StudentModel = (0, mongoose_1.model)('Student', StudentSchema);
