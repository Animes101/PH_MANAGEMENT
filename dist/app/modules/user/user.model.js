"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// Mongoose Schema
const UserSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true, // ID should be unique
    },
    password: {
        type: String,
        required: true,
    },
    needPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculity'],
        default: 'student',
        required: true,
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true } // automatically adds createdAt & updatedAt
);
// Model
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
