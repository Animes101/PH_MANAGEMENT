import express from "express";
import validationRequest from "../../utility/validatonJoi";
import { AccessTokenValidation, changePassword, frogetPaaswordValidation, loginValidation, resetPassword } from "./auth.validaion";
import { AuthController } from "./auth.controller";
import auth from "../../../middlwares/auth";
import { User_Role } from "../user/user.constance";


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


router.post(
  "/reset-password", auth(User_Role.admin, User_Role.faculity, User_Role.student),
  validationRequest(resetPassword),
  AuthController.resetPassword,
);


export const AuthRoutes = router;