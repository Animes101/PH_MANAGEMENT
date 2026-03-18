import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { OfferCourseServices } from "./offerCorse.services";
import sendResponse from "../../utility/respons";


const createOfferCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferCourseServices.createOfferCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offer Course created successfully",
    data: result,
  });
});

const getAllOfferCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferCourseServices.getAllOfferCoursesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offer Courses retrieved successfully",
    data: result,
  });
});

const getSingleOfferCourse = catchAsync(async (req: Request, res: Response) => {
  const _id  = req.params._id as string;

  const result =
    await OfferCourseServices.getSingleOfferCourseFromDB(_id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offer Course retrieved successfully",
    data: result,
  });
});

const updateOfferCourse = catchAsync(async (req: Request, res: Response) => {
  const _id  = req.params._id as string;

  const result = await OfferCourseServices.updateOfferCourseIntoDB(
    _id,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offer Course updated successfully",
    data: result,
  });
});

const deleteOfferCourse = catchAsync(async (req: Request, res: Response) => {
  const _id  = req.params._id as string;

  const result =
    await OfferCourseServices.deleteOfferCourseFromDB(_id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offer Course deleted successfully",
    data: result,
  });
});

export const OfferCourseController = {
  createOfferCourse,
  getAllOfferCourses,
  getSingleOfferCourse,
  updateOfferCourse,
  deleteOfferCourse,
};