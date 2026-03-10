"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facalityServices = void 0;
const queryBuilder_1 = __importDefault(require("../../queryBuilder/queryBuilder"));
const facality_model_1 = require("./facality.model");
const getAllFacality = async (query) => {
    const queryBuilder = new queryBuilder_1.default(facality_model_1.TeacherModel.find(), query);
    const result = await queryBuilder
        .search(['name', 'email'])
        .filter()
        .sort()
        .pagination()
        .fields()
        .modelQuery;
    return result;
};
const getSingleFacality = async (_id) => {
    const result = await facality_model_1.TeacherModel.findOne({ _id });
    return result;
};
exports.facalityServices = {
    getAllFacality,
    getSingleFacality
};
