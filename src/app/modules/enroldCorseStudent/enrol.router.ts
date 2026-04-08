import express from "express";
import validationRequest from "../../utility/validatonJoi";
import { enrolCourseStudentJoi, enrollCorseUpdateJoi } from "./enrol.validation";
import { User_Role } from "../user/user.constance";
import auth from "../../../middlwares/auth";
import { EnrolCourseController } from "./enrol.controller";

const router = express.Router();

// 👉 Create
router.post(
  "/enrolCourse",
  auth(User_Role.student),
  validationRequest(enrolCourseStudentJoi),
  EnrolCourseController.createEnrolCourse
);

// 👉 Update (Correct Version)
router.patch("/enrolCourse/Update", auth(User_Role.faculity), validationRequest(enrollCorseUpdateJoi), EnrolCourseController.updateEnrolCourse);

export const EnrollRouter = router;