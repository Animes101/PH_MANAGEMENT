"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterColtroller = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const respons_1 = __importDefault(require("../../utility/respons"));
const Register_services_1 = require("./Register.services");
const createRegister = (0, catchAsync_1.default)(async (req, res) => {
    const result = await Register_services_1.RegisterServices.createRegisterIntoBd(req.body);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Register Corse success fully',
        data: result,
    });
});
const upadeRegister = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await Register_services_1.RegisterServices.updateRegisterintoDb(_id, req.body);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Register Corse success fully',
        data: result,
    });
});
const deleteRegister = (0, catchAsync_1.default)(async (req, res) => {
    const result = await Register_services_1.RegisterServices.createRegisterIntoBd(req.body);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Register Corse success fully',
        data: result,
    });
});
const getAllReginster = (0, catchAsync_1.default)(async (req, res) => {
    const result = await Register_services_1.RegisterServices.findAllSingleRegister(req.query);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Register all Corse  successfully',
        data: result,
    });
});
const getSingleRegister = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await Register_services_1.RegisterServices.findOneSingleRegister(_id);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'get Single Register successfully',
        data: result,
    });
});
exports.RegisterColtroller = {
    createRegister,
    upadeRegister,
    deleteRegister,
    getAllReginster,
    getSingleRegister
};
