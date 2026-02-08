"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterModel = void 0;
const mongoose_1 = require("mongoose");
// month enum array (type-safe)
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: ['Autumn', 'Summer', 'Fall'],
        required: true,
    },
    code: {
        type: String,
        enum: ['01', '02', '03', '04'],
        required: true,
        unique: true,
    },
    year: {
        type: Number,
        required: true,
    },
    startMonth: {
        type: String,
        enum: months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: months,
        required: true,
    },
}, {
    timestamps: true,
});
exports.AcademicSemesterModel = (0, mongoose_1.model)('AcademicSemester', academicSemesterSchema);
