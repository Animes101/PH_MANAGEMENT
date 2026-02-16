"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyServices = void 0;
const faculty_model_1 = require("./faculty.model");
const createAcademicFacultyDb = async (payload) => {
    const result = await faculty_model_1.AcademicFacultyModel.create(payload);
    return result;
};
const getAllAcademicFacultyDb = async () => {
    const result = await faculty_model_1.AcademicFacultyModel.find();
    return result;
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
