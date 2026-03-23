// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import bcrypt from "bcrypt";
import { IUser } from "./auth.interface";




const loginUser = async (payload:IUser) => {

  const user = await UserModel.isUserExistsById(payload?.id);

  console.log(user)

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