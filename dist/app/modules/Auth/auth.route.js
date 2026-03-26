"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const auth_validaion_1 = require("./auth.validaion");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../../middlwares/auth"));
const user_constance_1 = require("../user/user.constance");
const router = express_1.default.Router();
router.post("/login", (0, validatonJoi_1.default)(auth_validaion_1.loginValidation), auth_controller_1.AuthController.login);
router.post("/changePassword", (0, auth_1.default)(), (0, validatonJoi_1.default)(auth_validaion_1.changePassword), auth_controller_1.AuthController.changePaaword);
router.post("/acessToken", (0, validatonJoi_1.default)(auth_validaion_1.AccessTokenValidation), auth_controller_1.AuthController.accessToken);
router.post("/froget-password", (0, validatonJoi_1.default)(auth_validaion_1.frogetPaaswordValidation), auth_controller_1.AuthController.forgetpaaword);
router.post("/reset-password", (0, auth_1.default)(user_constance_1.User_Role.admin, user_constance_1.User_Role.faculity, user_constance_1.User_Role.student), (0, validatonJoi_1.default)(auth_validaion_1.resetPassword), auth_controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;
