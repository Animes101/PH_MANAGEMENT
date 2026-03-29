"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const student_validation_1 = require("../student/student.validation");
const user_controller_1 = require("./user.controller");
const joi_validation_1 = require("../facality/joi.validation");
const admin_validation_1 = require("../admin/admin.validation");
const auth_1 = __importDefault(require("../../../middlwares/auth"));
const user_constance_1 = require("./user.constance");
const multer_1 = require("../../utils/multer");
const router = express_1.default.Router();
router.post('/user/create-Student', (0, auth_1.default)(user_constance_1.User_Role.admin), multer_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validatonJoi_1.default)(student_validation_1.createStudentSchema), user_controller_1.UsersController.createStudent);
router.post('/user/create-facality', (0, validatonJoi_1.default)(joi_validation_1.createTeacherValidation), user_controller_1.UsersController.createFacality);
router.post('/user/create-admin', (0, validatonJoi_1.default)(admin_validation_1.createAdminValidationSchema), user_controller_1.UsersController.createAdmin);
router.get('/get-me', (0, auth_1.default)(user_constance_1.User_Role.admin, user_constance_1.User_Role.faculity, user_constance_1.User_Role.student), user_controller_1.UsersController.ageMe);
exports.UserRoutes = router;
