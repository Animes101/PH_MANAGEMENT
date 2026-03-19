import express from "express";
import validationRequest from "../../utility/validatonJoi";
import { loginValidation, registerValidation } from "./auth.validaion";
import { AuthController } from "./auth.controller";


const router = express.Router();

router.post(
  "/register",
  validationRequest(registerValidation),
  AuthController.register
);

router.post(
  "/login",
  validationRequest(loginValidation),
  AuthController.login
);

export const AuthRoutes = router;