"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const queryBuilder_1 = __importDefault(require("../../queryBuilder/queryBuilder"));
const admin_model_1 = require("./admin.model");
const getAllAdminfromBd = async (query) => {
    const queryBuilder = new queryBuilder_1.default(admin_model_1.adminModel.find(), query);
    const admins = await queryBuilder
        .search(['name', 'email'])
        .filter()
        .sort()
        .pagination()
        .fields()
        .modelQuery;
    return admins;
};
const getSingleAdminFromDb = async (_id) => {
    const result = await admin_model_1.adminModel.findOne({ _id });
    return result;
};
exports.adminServices = {
    getAllAdminfromBd,
    getSingleAdminFromDb
};
