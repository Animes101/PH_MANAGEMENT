"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const router = express_1.default.Router();
router.post('/create-faculty', faculty_controller_1.academicFacultyController.createAcademicFaculty);
exports.AcademicFacultyRoutes = router;
