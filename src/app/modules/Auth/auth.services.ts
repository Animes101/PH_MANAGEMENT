
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import bcrypt from "bcrypt";
import { IUser } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { sendEmail } from "../../utils/sendEmail";




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


  const accessToken=createToken(jowPayload,config.JWT_ACCESS_TOKEN  as string, '10d')
  const refressToken=createToken(jowPayload,config.JWT_ACCESS_TOKEN as string , '365d')

  return {
    accessToken,
    refressToken,             
    needPasswordChange: true,
  };
};


const changePassword = async (
  newPassword: string,
  oldPassword: string,
  // এখানে iat: number যোগ করা হয়েছে
  authUser: { userId: string; userRole: string; iat: number } 
) => {

  const user = await UserModel.isUserExistsById(authUser.userId);

  // এখন TypeScript আর এরর দিবে না
  const { iat } = authUser;

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isDelete) {
    throw new AppError("User is already deleted", 403);
  }

  // ✅ old password check
  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError("Invalid credentials", 401);
  }


  if (
    user.passwordChangeAt && 
    await UserModel.isJWTIssuBeforePasswordChange(user.passwordChangeAt, iat)
  ) {
    throw new AppError('Your access token is invalid', 401);
  }

  // ✅ new password hash
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // ✅ update password
  const result = await UserModel.findOneAndUpdate(
    { id: user.id }, 
    {
      password: hashedPassword,
      needPassword: false,
      passwordChangeAt: new Date() 
    },
    {
      new: true,
    }
  );

  return result;
};                                                       


const accessToken=async (token:string)=>{

   if (!token) {
        throw new AppError("Forbidden access: No token provided", 403);
      }
  
      // ✅ Bearer token split
  
      if (!token) {
        throw new AppError("Forbidden access: Invalid token format", 403);
      }
  
      // ✅ verify token
      const decoded = jwt.verify(
        token,
        config.JWT_ACCESS_TOKEN as string
      ) as JwtPayload;

      const {userId} =decoded;


       const user = await UserModel.isUserExistsById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }else if(user?.isDelete === true){

    throw new AppError('user alredy Dele thi data base', 402)
  }

  const jowPayload={
    userId:user.id,
    userRole:user.role,

  }


  const accessToken= createToken(jowPayload,config.JWT_ACCESS_TOKEN  as string, '10d')

  return accessToken;



}

const forgetPawword=async (id:string)=>{

        const user = await UserModel.isUserExistsById(id);

        if (!user) {
          throw new AppError("User not found", 404);
        }else if(user?.isDelete === true){

          throw new AppError('user alredy Delete this data base', 402)
        }

        const jowPayload={
            userId:user.id,
            userRole:user.role,

          }


  const resetToken= createToken(jowPayload,config.JWT_ACCESS_TOKEN  as string, '10d')


        const restLink=`http://localhost:5000/api/v1?id=${user.id}&token=${resetToken}`


        sendEmail();

        


}



export const AuthService = {

  loginUser,
  changePassword,
  accessToken,
  forgetPawword

};