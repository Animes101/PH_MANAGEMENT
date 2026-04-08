import express from "express";
import { OfferCourseController } from "./offerCorse.controller";
import auth from "../../../middlwares/auth";
import { User_Role } from "../user/user.constance";

const router = express.Router();

router.post("/createOfferCorse", auth(User_Role.admin, User_Role.superAdmin), OfferCourseController.createOfferCourse);
router.get("/getOfferCorse",  auth(User_Role.admin, User_Role.superAdmin), OfferCourseController.getAllOfferCourses);
router.get("/:_id", auth(User_Role.admin, User_Role.superAdmin), OfferCourseController.getSingleOfferCourse);
router.patch("/:_id", auth(User_Role.admin, User_Role.superAdmin), OfferCourseController.updateOfferCourse);
router.delete("/:_id", auth(User_Role.admin, User_Role.superAdmin), OfferCourseController.deleteOfferCourse);
router.get('/getMyOffer/:Corse', auth(User_Role.student, User_Role.superAdmin), OfferCourseController.getMyOfferCourses);

export const OfferCourseRoutes = router;