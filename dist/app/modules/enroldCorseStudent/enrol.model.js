"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolCourseStudentModel = void 0;
const mongoose_1 = require("mongoose");
// ---------------- SCHEMA -------------------
const CourseMarkSchema = new mongoose_1.Schema({
    classTest1: { type: Number, required: true },
    classTest2: { type: Number, required: true },
    classTest3: { type: Number, required: true },
    midTerm: { type: Number, required: true },
    finalExam: { type: Number, required: true },
});
const EnrolCourseStudentSchema = new mongoose_1.Schema({
    semesterRegistration: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "SemesterRegistration" },
    academinSemester: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "AcademicSemester" },
    academicDepartment: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "AcademicDepartment" },
    offerCorse: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "OfferCourse" },
    corse: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Course" },
    student: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Student" },
    faculity: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Faculty" },
    isEnrollerd: { type: Boolean, default: false },
    corseMark: { type: CourseMarkSchema, required: true },
    grade: {
        type: String,
        enum: [
            "A+", "A", "A-",
            "B+", "B", "B-",
            "C+", "C", "C-",
            "D+", "D", "D-",
            "F",
        ],
        required: true,
    },
    isComplated: { type: Boolean, default: false },
}, { timestamps: true });
exports.EnrolCourseStudentModel = (0, mongoose_1.model)("EnrolCourseStudent", EnrolCourseStudentSchema);
