"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        select: false, // password select করলে response এ যাবে না
    },
    needPassword: {
        type: Boolean,
    },
    role: {
        type: String,
        enum: ["admin", "student", "faculity"],
        default: "student",
        required: true,
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        default: "in-progress",
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true } // automatically adds createdAt & updatedAt
);
// ✅ Pre-save middleware to hash password
UserSchema.pre('save', async function () {
    const saltRound = 12;
    this.password = await (bcrypt_1.default.hash(this.password, saltRound));
});
// Model
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
