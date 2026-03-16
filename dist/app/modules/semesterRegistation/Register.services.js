"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const queryBuilder_1 = __importDefault(require("../../queryBuilder/queryBuilder"));
const acadamin_model_1 = require("../acadamicSemister/acadamin.model");
const Register_model_1 = require("./Register.model");
const createRegisterIntoBd = async (payload) => {
    const academinExits = await acadamin_model_1.AcademicSemesterModel.findOne({ _id: payload.academinSemister });
    if (!academinExits) {
        throw new AppError_1.default('Academin Depertment not Fund', 401);
    }
    const isRegisterSementer = await Register_model_1.registerModel.findOne({ academinSemister: payload?.academinSemister });
    if (isRegisterSementer) {
        throw new AppError_1.default('academin sementer all redy exits', 401);
    }
    const result = await Register_model_1.registerModel.create(payload);
    return result;
};
const updateRegisterintoDb = async (payload) => {
    console.log(payload);
};
const deleteRegisterIntoDb = async (payload) => {
    console.log(payload);
};
const findOneSingleRegister = async (_id) => {
    const result = await Register_model_1.registerModel.findOne({ _id });
    return result;
};
const findAllSingleRegister = async (query) => {
    const queryBuilder = new queryBuilder_1.default(Register_model_1.registerModel.find(), query);
    const register = await queryBuilder
        .search(['academinSemister'])
        .filter()
        .sort()
        .pagination()
        .fields()
        .modelQuery;
    return register;
};
exports.RegisterServices = {
    createRegisterIntoBd,
    updateRegisterintoDb,
    deleteRegisterIntoDb,
    findOneSingleRegister,
    findAllSingleRegister
};
