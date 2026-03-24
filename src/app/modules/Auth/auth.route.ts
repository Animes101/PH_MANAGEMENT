import express from "express";
import validationRequest from "../../utility/validatonJoi";
import { changePassword, loginValidation } from "./auth.validaion";
import { AuthController } from "./auth.controller";
import auth from "../../../middlwares/auth";


const router = express.Router();



router.post(
  "/login",
  validationRequest(loginValidation),
  AuthController.login
);

router.post(
  "/changePassword",auth(), 
  validationRequest(changePassword),
  AuthController.changePaaword,
);

export const AuthRoutes = router;