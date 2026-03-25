import express from "express";
import validationRequest from "../../utility/validatonJoi";
import { AccessTokenValidation, changePassword, frogetPaaswordValidation, loginValidation } from "./auth.validaion";
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


router.post(
  "/acessToken",
  validationRequest(AccessTokenValidation),
  AuthController.accessToken,
);

router.post(
  "/froget-password",
  validationRequest(frogetPaaswordValidation),
  AuthController.forgetpaaword,
);


export const AuthRoutes = router;