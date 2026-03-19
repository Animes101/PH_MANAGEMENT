"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCourseModel = void 0;
const mongoose_1 = require("mongoose");
const offerCourseSchema = new mongoose_1.Schema({
    registationSementer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "register",
        required: true,
    },
    academinSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "register",
        required: true,
    },
    academinFacaulty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicfaculties",
        required: true,
    },
    corse: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "courses",
        required: true,
    },
    teacher: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "teachers",
        required: true,
    },
    maxCapacity: {
        type: Number,
        required: true,
    },
    minCapacity: {
        type: Number,
        required: true,
    },
    days: {
        type: String,
        enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.OfferCourseModel = (0, mongoose_1.model)("offercourse", offerCourseSchema);
