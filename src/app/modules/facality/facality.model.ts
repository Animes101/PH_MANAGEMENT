import { Schema, model } from "mongoose";
import { ITeacher } from "./facality.interface";

const teacherSchema = new Schema<ITeacher>(
  {
    id: {
      type: String,
      ref:'user',
      required: true,
      unique:true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique:true

    },

    name: {
      type: String,
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

    dateOfBirth: String,

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: String,

    address: String,

    designation: String,

    department: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
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