"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const admin_services_1 = require("./admin.services");
const getAllAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_services_1.adminServices.getAllAdminfromBd(req.query);
    res.status(200).json({
        success: true,
        message: 'All students Get  successfully',
        data: result,
    });
});
const getSingleAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params._id;
    const result = await admin_services_1.adminServices.getSingleAdminFromDb(id);
    res.status(200).json({
        success: true,
        message: 'Single admin Get  successfully',
        data: result,
    });
});
const deleteAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await admin_services_1.adminServices.deleteAdmin(_id);
    res.status(200).json({
        success: true,
        message: 'Single admin Get  successfully',
        data: result,
    });
});
const upadeAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await admin_services_1.adminServices.updateAdminfromDb(_id, req.body);
    res.status(200).json({
        success: true,
        message: 'admin Update Succes Fully successfully',
        data: result,
    });
});
exports.adminController = {
    getAllAdmin,
    getSingleAdmin,
    deleteAdmin,
    upadeAdmin
};
