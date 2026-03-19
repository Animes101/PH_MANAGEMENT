// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { TUser } from "./auth.interface";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import bcrypt from "bcrypt";


// const registerUser = async (payload: TUser) => {
//   const isUserExist = await UserModel.findOne({ email: payload.email });

//   if (isUserExist) {
//     throw new AppError("User already exists", 409);
//   }

//   const user = await UserModel.create(payload);
//   return user;
// };


const loginUser = async (payload: TUser) => {
  const user = await UserModel.findOne({ id: payload.id }).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }else if(user?.isDelete === true){

    throw new AppError('user alredy Dele thi data base', 402)
  }





  // 🔥 bcrypt compare
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError("Invalid credentials", 401);
  }

  return user;
};

export const AuthService = {

  loginUser,
};