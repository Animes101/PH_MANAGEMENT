import { Request, Response, NextFunction } from "express";
import { enrolCourseStudentJoi } from "./enrol.validation";
import { EnrolCourseService } from "./enrol.services";


export const EnrolCourseController = {
  
  // 👉 Create
  createEnrolCourse: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = enrolCourseStudentJoi.validate(req.body);
      if (error) return next(error);

      const result = await EnrolCourseService.createEnrol(value);

      res.status(201).json({
        success: true,
        message: "Enrol course created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

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
//   updateEnrolCourse: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const result = await EnrolCourseService.updateEnrol(
//         req.params.id,
//         req.body
//       );

//       res.json({
//         success: true,
//         message: "Enrol course updated",
//         data: result,
//       });
//     } catch (err) {
//       next(err);
//     }
//   },

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