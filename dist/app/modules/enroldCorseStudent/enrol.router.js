"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollRouter = void 0;
const express_1 = __importDefault(require("express"));
const enrol_controller_1 = require("./enrol.controller");
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const enrol_validation_1 = require("./enrol.validation");
const user_constance_1 = require("../user/user.constance");
const auth_1 = __importDefault(require("../../../middlwares/auth"));
const router = express_1.default.Router();
// 👉 Create
router.post("/enrolCourse", (0, auth_1.default)(user_constance_1.User_Role.admin), (0, validatonJoi_1.default)(enrol_validation_1.enrolCourseStudentJoi), enrol_controller_1.EnrolCourseController.createEnrolCourse);
// // 👉 Get All
// router.get("/enrolCourse", EnrolCourseController.getAllEnrolCourse);
// // 👉 Get Single
// router.get("/enrolCourse/:id", EnrolCourseController.getSingleEnrolCourse);
// 👉 Update
router.patch("/enrolCourse/:id", enrol_controller_1.EnrolCourseController.updateEnrolCourse);
// // 👉 Delete
// router.delete("/enrolCourse/:id", EnrolCourseController.deleteEnrolCourse);
exports.EnrollRouter = router;
