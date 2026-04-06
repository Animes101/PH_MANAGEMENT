"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const faculty_validation_1 = require("./faculty.validation");
const auth_1 = __importDefault(require("../../../middlwares/auth"));
const user_constance_1 = require("../user/user.constance");
const router = express_1.default.Router();
router.post('/create-faculty', (0, auth_1.default)(user_constance_1.User_Role.superAdmin, user_constance_1.User_Role.admin), (0, validatonJoi_1.default)(faculty_validation_1.createAcademicFacultySchemaValidation), faculty_controller_1.academicFacultyController.createAcademicFaculty);
router.get('/get-all-faculty', (0, auth_1.default)(user_constance_1.User_Role.superAdmin, user_constance_1.User_Role.admin), faculty_controller_1.academicFacultyController.getAllAcademicFaculty);
router.get('/get-single-faculty/:id', (0, auth_1.default)(user_constance_1.User_Role.superAdmin, user_constance_1.User_Role.admin), faculty_controller_1.academicFacultyController.getSingleAcademicFaculty);
router.patch('/update-faculty/:id', (0, auth_1.default)(user_constance_1.User_Role.superAdmin, user_constance_1.User_Role.admin), (0, validatonJoi_1.default)(faculty_validation_1.createAcademicFacultySchemaValidation), faculty_controller_1.academicFacultyController.updateAcademicFaculty);
exports.AcademicFacultyRoutes = router;
