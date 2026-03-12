"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corseController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const respons_1 = __importDefault(require("../../utility/respons"));
const corse_services_1 = require("./corse.services");
const createCorse = (0, catchAsync_1.default)(async (req, res) => {
    const result = await corse_services_1.corseServices.createCorseIntoDb(req.body);
    (0, respons_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'create Corse Successfuly',
        data: result
    });
});
const getAllCorse = (0, catchAsync_1.default)(async (req, res) => {
    const result = await corse_services_1.corseServices.getAllCorsefromBd(req.query);
    (0, respons_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'create Corse Successfuly',
        data: result
    });
});
const getSingleCorseFromDb = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await corse_services_1.corseServices.getSingleCorseInotDb(_id);
    (0, respons_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'create Corse Successfuly',
        data: result
    });
});
const deleteCorse = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await corse_services_1.corseServices.deleteCorseFromDb(_id);
    (0, respons_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Delete  Corse Successfuly',
        data: result
    });
});
const updateCorse = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await corse_services_1.corseServices.updateCorseFromDb(_id, req.body);
    (0, respons_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Update Corse  Successfuly',
        data: result
    });
});
exports.corseController = {
    createCorse,
    getAllCorse,
    getSingleCorseFromDb,
    deleteCorse,
    updateCorse
};
