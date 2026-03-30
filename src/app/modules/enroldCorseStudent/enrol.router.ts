import express from "express";
import { EnrolCourseController } from "./enrol.controller";



const router = express.Router();

// 👉 Create
router.post("/enrolCourse", EnrolCourseController.createEnrolCourse);

// // 👉 Get All
// router.get("/enrolCourse", EnrolCourseController.getAllEnrolCourse);

// // 👉 Get Single
// router.get("/enrolCourse/:id", EnrolCourseController.getSingleEnrolCourse);

// // 👉 Update
// router.patch("/enrolCourse/:id", EnrolCourseController.updateEnrolCourse);

// // 👉 Delete
// router.delete("/enrolCourse/:id", EnrolCourseController.deleteEnrolCourse);

export const  EnrollRouter= router;