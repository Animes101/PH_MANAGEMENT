"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyServices = void 0;
const faculty_model_1 = require("./faculty.model");
const createAcademicFacultyDb = async (payload) => {
    const result = await faculty_model_1.AcademicFacultyModel.create(payload);
    return result;
};
exports.academicFacultyServices = {
    createAcademicFacultyDb,
};
