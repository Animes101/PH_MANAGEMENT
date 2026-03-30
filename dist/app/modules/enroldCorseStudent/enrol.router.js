"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollRouter = void 0;
const express_1 = __importDefault(require("express"));
const enrol_controller_1 = require("./enrol.controller");
const router = express_1.default.Router();
// 👉 Create
router.post("/enrolCourse", enrol_controller_1.EnrolCourseController.createEnrolCourse);
// // 👉 Get All
// router.get("/enrolCourse", EnrolCourseController.getAllEnrolCourse);
// // 👉 Get Single
// router.get("/enrolCourse/:id", EnrolCourseController.getSingleEnrolCourse);
// // 👉 Update
// router.patch("/enrolCourse/:id", EnrolCourseController.updateEnrolCourse);
// // 👉 Delete
// router.delete("/enrolCourse/:id", EnrolCourseController.deleteEnrolCourse);
exports.EnrollRouter = router;
