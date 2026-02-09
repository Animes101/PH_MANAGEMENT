"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAcademicSemesterSercices = void 0;
const acadamin_model_1 = require("./acadamin.model");
//create academic semester
const createAcademicSemester = async (payload) => {
    //semester name and code validation
    const academicSemesterNameCodeMap = {
        'Autumn': '01',
        'Summer': '02',
        'Fall': '03',
    };
    if (academicSemesterNameCodeMap[payload.name] !== payload.code) {
        throw new Error('Invalid semester name and code combination');
    }
    const result = await acadamin_model_1.AcademicSemesterModel.create(payload);
    return result;
};
//export academic semester services
exports.createAcademicSemesterSercices = {
    createAcademicSemester
};
