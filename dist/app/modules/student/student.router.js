"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
router.get('/getStudent', student_controller_1.studentController.getAllStudents);
router.get('/singleStudent/:_id', student_controller_1.studentController.getSingleStudent);
router.delete('/deleteStudent/:id', student_controller_1.studentController.deleteStudent);
exports.StudentRoutes = router;
