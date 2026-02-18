"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academinControlar = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const respons_1 = __importDefault(require("../../utility/respons"));
const academinDepertMent_services_1 = require("./academinDepertMent.services");
const createAcademinDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await academinDepertMent_services_1.academinServices.createAcademinDepartmentDb(req.body);
    (0, respons_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Academic Department created successfully",
        data: result,
    });
});
const ageAllAcademinDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await academinDepertMent_services_1.academinServices.getAllAcademinDepartmentDb();
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department retrieved successfully",
        data: result,
    });
});
const getSingleAcademinDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await academinDepertMent_services_1.academinServices.getSingleAcademinDepartmentDb(req.params.id);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department retrieved successfully",
        data: result,
    });
});
const updateAcademinDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await academinDepertMent_services_1.academinServices.updateAcademinDepartmentDb(req.params.id, req.body);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department updated successfully",
        data: result,
    });
});
exports.academinControlar = {
    createAcademinDepartment,
    ageAllAcademinDepartment,
    getSingleAcademinDepartment,
    updateAcademinDepartment,
};
