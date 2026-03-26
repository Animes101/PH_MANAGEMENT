"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Schema
const UserSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true },
    needPassword: { type: Boolean },
    role: {
        type: String,
        enum: ["admin", "student", "faculity"],
        default: "student",
    },
    status: { type: String, enum: ["in-progress", "blocked"], default: "in-progress" },
    isDelete: { type: Boolean, default: false },
    passwordChangeAt: {
        type: Date,
    }
}, { timestamps: true });
// Pre-save hook
UserSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return;
    const saltRounds = 12;
    this.password = await bcrypt_1.default.hash(this.password, saltRounds);
});
// Static method
UserSchema.statics.isUserExistsById = async function (id) {
    return this.findOne({ id }).select('+password');
};
UserSchema.statics.isJWTIssuBeforePasswordChange = async function (passwordChangedAt, jwtIssuedAt) {
    // If the user never changed password → token is valid
    if (!passwordChangedAt)
        return false;
    // Convert to seconds
    const changedTimestamp = Math.floor(new Date(passwordChangedAt).getTime() / 1000);
    // If password changed after token issued → token invalid
    return changedTimestamp > jwtIssuedAt;
};
// Model
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
