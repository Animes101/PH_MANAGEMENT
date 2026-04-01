import express from "express";
import { EnrolCourseController } from "./enrol.controller";
import validationRequest from "../../utility/validatonJoi";
import { enrolCourseStudentJoi } from "./enrol.validation";
import { User_Role } from "../user/user.constance";
import auth from "../../../middlwares/auth";



const router = express.Router();

// 👉 Create
router.post("/enrolCourse", auth(User_Role.admin), validationRequest(enrolCourseStudentJoi), EnrolCourseController.createEnrolCourse);

// // 👉 Get All
// router.get("/enrolCourse", EnrolCourseController.getAllEnrolCourse);

// // 👉 Get Single
// router.get("/enrolCourse/:id", EnrolCourseController.getSingleEnrolCourse);

// 👉 Update
router.patch("/enrolCourse/:id", EnrolCourseController.updateEnrolCourse);

// // 👉 Delete
// router.delete("/enrolCourse/:id", EnrolCourseController.deleteEnrolCourse);

export const  EnrollRouter = router;