// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import bcrypt from "bcrypt";
import { IUser } from "./auth.interface";
import  Jwt  from "jsonwebtoken";
import config from "../../config";




const loginUser = async (payload:IUser) => {

  const user = await UserModel.isUserExistsById(payload?.id);


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


  const jowPayload={
    userId:user.id,
    userRole:user.role,

  }
  //create token json web token


  const accessToken=Jwt.sign(jowPayload, config.JWT_ACCESS_TOKEN as string, { expiresIn: '10d' });

  return {
    accessToken,
    needPasswordChange: true,
  };
};

export const AuthService = {

  loginUser,
};