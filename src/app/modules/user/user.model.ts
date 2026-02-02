import {model, Schema } from "mongoose";
import { TUser } from "./user.interface";

// Mongoose Schema
const UserSchema = new Schema<TUser>(
  {
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
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);



// Model
export const UserModel = model<TUser>('User', UserSchema);