"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const offerCorse_controller_1 = require("./offerCorse.controller");
const router = express_1.default.Router();
router.post("/createOfferCorse", offerCorse_controller_1.OfferCourseController.createOfferCourse);
router.get("/", offerCorse_controller_1.OfferCourseController.getAllOfferCourses);
router.get("/:_id", offerCorse_controller_1.OfferCourseController.getSingleOfferCourse);
router.patch("/:_id", offerCorse_controller_1.OfferCourseController.updateOfferCourse);
router.delete("/:_id", offerCorse_controller_1.OfferCourseController.deleteOfferCourse);
exports.OfferCourseRoutes = router;
