import express from "express";
import { OfferCourseController } from "./offerCorse.controller";

const router = express.Router();

router.post("/createOfferCorse", OfferCourseController.createOfferCourse);
router.get("/", OfferCourseController.getAllOfferCourses);
router.get("/:_id", OfferCourseController.getSingleOfferCourse);
router.patch("/:_id", OfferCourseController.updateOfferCourse);
router.delete("/:_id", OfferCourseController.deleteOfferCourse);

export const OfferCourseRoutes = router;