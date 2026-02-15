"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyModel = void 0;
const mongoose_1 = require("mongoose");
const academinSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
}, { timestamps: true } // auto adds createdAt & updatedAt
);
// Mongoose Model
exports.AcademicFacultyModel = (0, mongoose_1.model)('AcademicFaculty', academinSchema);
