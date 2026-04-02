import { Request, Response, NextFunction } from "express";
import { EnrolCourseService } from "./enrol.services";
import catchAsync from "../../utility/catchAsync";


export const EnrolCourseController = {
  
  // 👉 Create
  createEnrolCourse: catchAsync(async (req: Request, res: Response) => {

      const userId=req.user?.userId;
      const result = await EnrolCourseService.createEnrol(req.body, userId);

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
  updateEnrolCourse:catchAsync(async (req: Request, res: Response,) => {

     

      const facalitiId=req.user?.userId;

      const payload=req.body;

  

      const result = await EnrolCourseService.updateEnrol(payload, facalitiId);

      res.status(201).json({
        success: true,
        message: "Enrol course created successfully",
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