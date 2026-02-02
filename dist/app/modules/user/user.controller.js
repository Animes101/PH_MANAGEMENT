"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const createStudent = async (req, res) => {
    try {
        const { studentData } = req.body;
        console.log(studentData);
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
