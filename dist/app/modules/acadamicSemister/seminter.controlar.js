"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academinSemesterController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const semister_services_1 = require("./semister.services");
const createAcademicSemester = (0, catchAsync_1.default)(async (req, res) => {
    const { data } = req.body;
    const result = await semister_services_1.createAcademicSemesterSercices.createAcademicSemester(data);
    res.status(200).json({
        success: true,
        message: "academic semester created successfully",
        data: result
    });
});
const getAllAcademicSemesters = (0, catchAsync_1.default)(async (req, res) => {
    const result = await semister_services_1.createAcademicSemesterSercices.getAllAcademicSemesters();
    res.status(200).json({
        success: true,
        message: "academic semester retrived successfully",
        data: result
    });
});
const getSingleAcademicSemester = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await semister_services_1.createAcademicSemesterSercices.getSingleAcademicSemester(id);
    res.status(201).json({
        success: true,
        message: "academic semester retrived successfully",
        data: result
    });
});
exports.academinSemesterController = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
};
