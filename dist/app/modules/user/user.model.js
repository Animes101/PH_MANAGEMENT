"use strict";
// import { model, Schema } from "mongoose";
// import { TUser } from "./user.interface";
// import bcrypt from "bcrypt";
// import { authModel } from "../Auth/auth.interface";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// // Mongoose Schema
// const UserSchema = new Schema<TUser, authModel>(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true, // ID should be unique
//     },
//     password: {
//       type: String,
//       required: true,
//       select: false, // password select করলে response এ যাবে না
//     },
//     needPassword: {
//       type: Boolean,
//     },
//     role: {
//       type: String,
//       enum: ["admin", "student", "faculity"],
//       default: "student",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["in-progress", "blocked"],
//       default: "in-progress",
//     },
//     isDelete: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true } 
// );
// // ✅ Pre-save middleware to hash password
// UserSchema.pre('save', async function() {
// const saltRound=12
//   this.password=await (bcrypt.hash(this.password, saltRound))
// });
// UserSchema.static.isUserExitsById=async(id:string)=>{
//   const user= UserModel.findOne({id})
//   return user
// }
// // Model
// export const UserModel = model<TUser, authModel>("User", UserSchema);
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Schema
const UserSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    needPassword: { type: Boolean },
    role: {
        type: String,
        enum: ["admin", "student", "faculity"],
        default: "student",
    },
    status: { type: String, enum: ["in-progress", "blocked"], default: "in-progress" },
    isDelete: { type: Boolean, default: false },
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
    return this.findOne({ id }).select('+ password');
};
// Model
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
