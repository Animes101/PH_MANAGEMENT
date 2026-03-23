import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { AuthService } from "./auth.services";



const login = catchAsync(async (req: Request, res: Response) => {

  const result = await AuthService.loginUser(req.body.body);


  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
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


export const AuthController = {

  login,
  changePaaword
};