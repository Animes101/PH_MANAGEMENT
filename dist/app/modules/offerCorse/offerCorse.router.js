"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const offerCorse_controller_1 = require("./offerCorse.controller");
const auth_1 = __importDefault(require("../../../middlwares/auth"));
const user_constance_1 = require("../user/user.constance");
const router = express_1.default.Router();
router.post("/createOfferCorse", (0, auth_1.default)(user_constance_1.User_Role.admin, user_constance_1.User_Role.superAdmin), offerCorse_controller_1.OfferCourseController.createOfferCourse);
router.get("/getOfferCorse", (0, auth_1.default)(user_constance_1.User_Role.admin, user_constance_1.User_Role.superAdmin), offerCorse_controller_1.OfferCourseController.getAllOfferCourses);
router.get("/:_id", (0, auth_1.default)(user_constance_1.User_Role.admin, user_constance_1.User_Role.superAdmin), offerCorse_controller_1.OfferCourseController.getSingleOfferCourse);
router.patch("/:_id", (0, auth_1.default)(user_constance_1.User_Role.admin, user_constance_1.User_Role.superAdmin), offerCorse_controller_1.OfferCourseController.updateOfferCourse);
router.delete("/:_id", (0, auth_1.default)(user_constance_1.User_Role.admin, user_constance_1.User_Role.superAdmin), offerCorse_controller_1.OfferCourseController.deleteOfferCourse);
router.get('/getMyOffer/:Corse', (0, auth_1.default)(user_constance_1.User_Role.student, user_constance_1.User_Role.superAdmin), offerCorse_controller_1.OfferCourseController.getMyOfferCourses);
exports.OfferCourseRoutes = router;
