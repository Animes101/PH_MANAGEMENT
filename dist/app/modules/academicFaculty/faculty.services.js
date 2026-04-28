"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyServices = void 0;
const queryBuilder_1 = __importDefault(require("../../queryBuilder/queryBuilder"));
const faculty_model_1 = require("./faculty.model");
const createAcademicFacultyDb = async (payload) => {
    // 🔥 আগে check করবে same name আছে কিনা
    const existingFaculty = await faculty_model_1.AcademicFacultyModel.findOne({
        name: payload.name,
    });
    if (existingFaculty) {
        throw new Error("Academic Faculty already exists");
    }
    // 🔥 না থাকলে create করবে
    const result = await faculty_model_1.AcademicFacultyModel.create(payload);
    return result;
};
const getAllAcademicFacultyDb = async (query) => {
    const queryBuilder = new queryBuilder_1.default(faculty_model_1.AcademicFacultyModel.find(), query);
    const academicFaculties = await queryBuilder
        .search(['name'])
        .filter()
        .sort()
        .pagination()
        .fields()
        .modelQuery;
    const meta = await queryBuilder.coutTotal();
    return { meta, data: academicFaculties };
};
const getSingleAcademicFacultyDb = async (id) => {
    const result = await faculty_model_1.AcademicFacultyModel.findById(id);
    return result;
};
const updateAcademincFacultyDb = async (id, payload) => {
    const result = await faculty_model_1.AcademicFacultyModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
exports.academicFacultyServices = {
    createAcademicFacultyDb,
    getAllAcademicFacultyDb,
    getSingleAcademicFacultyDb,
    updateAcademincFacultyDb
};
