"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academinServices = void 0;
const queryBuilder_1 = __importDefault(require("../../queryBuilder/queryBuilder"));
const academinDepertMent_model_1 = require("./academinDepertMent.model");
const createAcademinDepartmentDb = (payload) => {
    const result = academinDepertMent_model_1.academinDepertModel.create(payload);
    return result;
};
const getAllAcademinDepartmentDb = async (query) => {
    const queryBuilder = new queryBuilder_1.default(academinDepertMent_model_1.academinDepertModel.find(), query);
    const academinDepartments = await queryBuilder
        .search(['name'])
        .filter()
        .sort()
        .pagination()
        .fields()
        .modelQuery;
    const meta = await queryBuilder.coutTotal();
    return { meta, data: academinDepartments };
};
const getSingleAcademinDepartmentDb = (id) => {
    const result = academinDepertMent_model_1.academinDepertModel.findById(id);
    return result;
};
const updateAcademinDepartmentDb = (id, payload) => {
    const result = academinDepertMent_model_1.academinDepertModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
exports.academinServices = {
    createAcademinDepartmentDb,
    getAllAcademinDepartmentDb,
    getSingleAcademinDepartmentDb,
    updateAcademinDepartmentDb
};
