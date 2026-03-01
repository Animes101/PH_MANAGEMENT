"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const student_validation_1 = require("../student/student.validation");
const router = express_1.default.Router();
router.post('/user/create-Student', (0, validatonJoi_1.default)(student_validation_1.createStudentSchema), user_controller_1.UsersController.createStudent);
exports.UserRoutes = router;
