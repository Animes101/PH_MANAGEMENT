
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import { authModel } from "../Auth/auth.interface";

// Schema
const UserSchema = new Schema<TUser, authModel>(
  {
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
    passwordChangeAt:{
      type:Date,
    }
  },
  { timestamps: true }
);

// Pre-save hook
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// Static method
UserSchema.statics.isUserExistsById = async function (id: string) {
  return this.findOne({ id }).select('+password');
};

UserSchema.statics.isJWTIssuBeforePasswordChange = async function (
  passwordChangedAt: Date | undefined,
  jwtIssuedAt: number
) {
  // If the user never changed password → token is valid
  if (!passwordChangedAt) return false;

  // Convert to seconds
  const changedTimestamp = Math.floor(new Date(passwordChangedAt).getTime() / 1000);

  // If password changed after token issued → token invalid

  console.log(changedTimestamp > jwtIssuedAt)
  return changedTimestamp > jwtIssuedAt;
};




// Model
export const UserModel = model<TUser, authModel>("User", UserSchema);
