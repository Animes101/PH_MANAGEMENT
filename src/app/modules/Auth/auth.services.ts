// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { TUser } from "./auth.interface";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";

// const registerUser = async (payload: TUser) => {
//   const isUserExist = await UserModel.findOne({ email: payload.email });

//   if (isUserExist) {
//     throw new AppError("User already exists", 409);
//   }

//   const user = await UserModel.create(payload);
//   return user;
// };

const loginUser = async (payload: TUser) => {

    console.log(payload)

  const user = await UserModel.findOne({ id: payload.id }).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordMatched = payload.password === user.password;

  if (!isPasswordMatched) {
    throw new AppError("Invalid credentials", 401);
  }

  return user;
};

export const AuthService = {

  loginUser,
};