"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academinDepertModel = exports.academinSchema = void 0;
const mongoose_1 = require("mongoose");
exports.academinSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    academinFacality: { type: mongoose_1.Schema.Types.ObjectId, ref: "AcademicFaculty", required: true },
}, { timestamps: true });
exports.academinDepertModel = (0, mongoose_1.model)('AcademinDepartment', exports.academinSchema);
