// import { model, Schema } from "mongoose";
// import { TUser } from "./user.interface";
// import bcrypt from "bcrypt";
// import { authModel } from "../Auth/auth.interface";

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
  return this.findOne({ id }).select('+ password');
};

// Model
export const UserModel = model<TUser, authModel>("User", UserSchema);
