"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolCourseStudentModel = void 0;
const mongoose_1 = require("mongoose");
// ---------------- SCHEMA -------------------
const CourseMarkSchema = new mongoose_1.Schema({
    classTest1: { type: Number, default: 0 },
    classTest2: { type: Number, default: 0 },
    classTest3: { type: Number, default: 0 },
    midTerm: { type: Number, default: 0 },
    finalExam: { type: Number, default: 0 },
});
const EnrolCourseStudentSchema = new mongoose_1.Schema({
    semesterRegistration: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "SemesterRegistration" },
    academinSemester: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "AcademicSemester" },
    offerCorse: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "OfferCourse" },
    corse: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Course" },
    student: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Student" },
    faculity: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Faculty" },
    isEnrollerd: { type: Boolean, default: false },
    corseMark: { type: CourseMarkSchema, default: () => ({}) },
    grade: {
        type: String,
        enum: [
            "A+", "A", "A-",
            "B+", "B", "B-",
            "C+", "C", "C-",
            "D+", "D", "D-",
            "F", "N/A"
        ],
        default: "N/A",
    },
    isComplated: { type: Boolean, default: false },
}, { timestamps: true });
exports.EnrolCourseStudentModel = (0, mongoose_1.model)("EnrolCourseStudent", EnrolCourseStudentSchema);
