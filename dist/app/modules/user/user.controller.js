"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_services_1 = require("./user.services");
const createStudent = async (req, res) => {
    try {
        const { studentData } = req.body;
        const result = await user_services_1.UsersServices.createStudentIntoDB(studentData);
        // Client e response pathano
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};
exports.UsersController = {
    createStudent,
};
