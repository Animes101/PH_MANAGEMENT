import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { AuthService } from "./auth.services";



const login = catchAsync(async (req: Request, res: Response) => {

  const result = await AuthService.loginUser(req.body.body);

  const {refressToken , accessToken , needPasswordChange}= result;

  res.cookie('refressToken', refressToken)


  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

const changePaaword = catchAsync(async (req: Request, res: Response) => {

  const {newpassword, oldpassword}=req.body;

  const user=req.user;


  const result = await AuthService.changePassword(newpassword, oldpassword, user);


  res.status(200).json({
    success: true,
    message: "password change  successful",
    data: result,
  });
});


const accessToken = catchAsync(async (req: Request, res: Response) => {

  const {refressToken}=req.cookies


  const result = await AuthService.accessToken(refressToken);

  res.status(200).json({
    success: true,
    message: "accces token create  successful",
    data: result,
  });
});


const forgetpaaword = catchAsync(async (req: Request, res: Response) => {

  const id = req.body.id


  const result = await AuthService.forgetPawword(id);

  res.status(200).json({
    success: true,
    message: "Please check your email ",
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {

  const id = req.body.id;
  const newPassword=req.body.newPassword;

  const tokenUser=req.user;


  const result = await AuthService.resetPassword(id, newPassword, tokenUser);

  res.status(200).json({
    success: true,
    message: "password reset success fully",
    data: result,
  });
});



export const AuthController = {

  login,
  changePaaword,
  accessToken,
  forgetpaaword,
  resetPassword
};