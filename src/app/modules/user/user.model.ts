import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";

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
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

// ✅ Pre-save middleware to hash password
UserSchema.pre('save', async function() {


const saltRound=12

  this.password=await (bcrypt.hash(this.password, saltRound))

});

// Model
export const UserModel = model<TUser>("User", UserSchema);


