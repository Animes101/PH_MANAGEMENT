"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolCourseController = void 0;
const enrol_services_1 = require("./enrol.services");
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
exports.EnrolCourseController = {
    // 👉 Create
    createEnrolCourse: (0, catchAsync_1.default)(async (req, res) => {
        const userId = req.user?.userId;
        const result = await enrol_services_1.EnrolCourseService.createEnrol(req.body, userId);
        res.status(201).json({
            success: true,
            message: "Enrol course created successfully",
            data: result,
        });
    }),
    // 👉 Get All
    //   getAllEnrolCourse: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       const result = await EnrolCourseService.getAllEnrol();
    //       res.json({
    //         success: true,
    //         message: "All enrol courses fetched",
    //         data: result,
    //       });
    //     } catch (err) {
    //       next(err);
    //     }
    //   },
    //   // 👉 Get Single
    //   getSingleEnrolCourse: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       const result = await EnrolCourseService.getSingleEnrol(req.params.id);
    //       res.json({
    //         success: true,
    //         message: "Single enrol course fetched",
    //         data: result,
    //       });
    //     } catch (err) {
    //       next(err);
    //     }
    //   },
    //   // 👉 Update
    updateEnrolCourse: (0, catchAsync_1.default)(async (req, res) => {
        const facalitiId = req.user?.userId;
        const payload = req.body;
        const result = await enrol_services_1.EnrolCourseService.updateEnrol(payload, facalitiId);
        res.status(201).json({
            success: true,
            message: "Enrol course Update  successfully",
            data: result,
        });
    })
    //   // 👉 Delete
    //   deleteEnrolCourse: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       const result = await EnrolCourseService.deleteEnrol(req.params.id);
    //       res.json({
    //         success: true,
    //         message: "Enrol course deleted",
    //         data: result,
    //       });
    //     } catch (err) {
    //       next(err);
    //     }
    //   },
};
