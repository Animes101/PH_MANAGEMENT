"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCourseController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const offerCorse_services_1 = require("./offerCorse.services");
const respons_1 = __importDefault(require("../../utility/respons"));
const createOfferCourse = (0, catchAsync_1.default)(async (req, res) => {
    const result = await offerCorse_services_1.OfferCourseServices.createOfferCourseIntoDB(req.body);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Offer Course created successfully",
        data: result,
    });
});
const getAllOfferCourses = (0, catchAsync_1.default)(async (req, res) => {
    const result = await offerCorse_services_1.OfferCourseServices.getAllOfferCoursesFromDB();
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Offer Courses retrieved successfully",
        data: result,
    });
});
const getSingleOfferCourse = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await offerCorse_services_1.OfferCourseServices.getSingleOfferCourseFromDB(_id);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Offer Course retrieved successfully",
        data: result,
    });
});
const updateOfferCourse = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await offerCorse_services_1.OfferCourseServices.updateOfferCourseIntoDB(_id, req.body);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Offer Course updated successfully",
        data: result,
    });
});
const deleteOfferCourse = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await offerCorse_services_1.OfferCourseServices.deleteOfferCourseFromDB(_id);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Offer Course deleted successfully",
        data: result,
    });
});
exports.OfferCourseController = {
    createOfferCourse,
    getAllOfferCourses,
    getSingleOfferCourse,
    updateOfferCourse,
    deleteOfferCourse,
};
