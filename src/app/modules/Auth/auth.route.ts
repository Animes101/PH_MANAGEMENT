import express from "express";
import validationRequest from "../../utility/validatonJoi";
import { loginValidation } from "./auth.validaion";
import { AuthController } from "./auth.controller";


const router = express.Router();



router.post(
  "/login",
  validationRequest(loginValidation),
  AuthController.login
);

export const AuthRoutes = router;