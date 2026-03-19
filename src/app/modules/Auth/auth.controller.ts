import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { AuthService } from "./auth.services";


const register = catchAsync(async (req: Request, res: Response) => {
//   const result = await AuthService.registerUser(req.body);

    console.log(req.body)

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data:'',
  });
});

const login = catchAsync(async (req: Request, res: Response) => {

  const result = await AuthService.loginUser(req.body.body);


  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const AuthController = {
  register,
  login,
};