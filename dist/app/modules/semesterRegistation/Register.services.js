"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterServices = void 0;
const Register_model_1 = require("./Register.model");
const createRegisterIntoBd = async (payload) => {
    console.log(payload);
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
const findAllSingleRegister = async () => {
    const result = await Register_model_1.registerModel.find();
    return result;
};
exports.RegisterServices = {
    createRegisterIntoBd,
    updateRegisterintoDb,
    deleteRegisterIntoDb,
    findOneSingleRegister,
    findAllSingleRegister
};
