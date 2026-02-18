"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const respons_1 = __importDefault(require("../../utility/respons"));
const faculty_services_1 = require("./faculty.services");
const createAcademicFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const result = await faculty_services_1.academicFacultyServices.createAcademicFacultyDb(req.body);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty created successfully",
        data: result,
    });
});
const getAllAcademicFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const result = await faculty_services_1.academicFacultyServices.getAllAcademicFacultyDb();
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty retrieved successfully",
        data: result,
    });
});
const getSingleAcademicFaculty = (0, catchAsync_1.default)(async (req, res) => {
    const result = await faculty_services_1.academicFacultyServices.getSingleAcademicFacultyDb(req.params.id);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty retrieved successfully",
        data: result,
    });
});
const updateAcademicFaculty = (0, catchAsync_1.default)(async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    const result = await faculty_services_1.academicFacultyServices.updateAcademincFacultyDb(req.params.id, req.body);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty updated successfully",
        data: result,
    });
});
exports.academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    updateAcademicFaculty,
    getSingleAcademicFaculty
};
