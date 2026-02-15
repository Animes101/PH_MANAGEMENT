"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const globallErrorHandler_1 = require("./middlwares/globallErrorHandler");
const notFound_1 = __importDefault(require("./middlwares/notFound"));
const student_router_1 = require("./app/modules/student/student.router");
const semister_route_1 = require("./app/modules/acadamicSemister/semister.route");
const faculty_router_1 = require("./app/modules/academicFaculty/faculty.router");
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1', user_route_1.UserRoutes);
app.use('/api/v1', student_router_1.StudentRoutes);
app.use('/api/v1', semister_route_1.academicSemesterRoute);
app.use('/api/v1', faculty_router_1.AcademicFacultyRoutes);
//Global Error Handler
app.use(globallErrorHandler_1.errorHandler);
//Not Fount Route
app.use(notFound_1.default);
exports.default = app;
