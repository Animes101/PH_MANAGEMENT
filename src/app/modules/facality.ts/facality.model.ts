import { Schema, model } from "mongoose";
import { ITeacher } from "./facality.interface";


const teacherSchema = new Schema<ITeacher>(
  {
    name: {
      type: String,
      required: true,
    },

    id: {
      type: String,
      required: true,
      unique: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },

    dateOfBirth: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    department: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },

    isActive: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const TeacherModel = model<ITeacher>("Teacher", teacherSchema);