"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_services_1 = require("./user.services");
const student_validation_1 = require("../student/student.validation");
const createStudent = async (req, res) => {
    try {
        const { error, value } = student_validation_1.createStudentSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
                error,
            });
        }
        // schema অনুযায়ী value.studentData আসবেই
        const result = await user_services_1.UsersServices.createStudentIntoDB(value.studentData);
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
