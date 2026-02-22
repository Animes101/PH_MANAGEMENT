"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academinServices = void 0;
const academinDepertMent_model_1 = require("./academinDepertMent.model");
const createAcademinDepartmentDb = (payload) => {
    const result = academinDepertMent_model_1.academinDepertModel.create(payload);
    return result;
};
const getAllAcademinDepartmentDb = () => {
    const retult = academinDepertMent_model_1.academinDepertModel.find().populate('academinFacality');
    return retult;
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
