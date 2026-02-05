import { NextFunction, Request, Response } from 'express';
import { UsersServices } from './user.services';
import { createStudentSchema } from '../student/student.validation';
import sendResponse from '../../utility/respons';



const createStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { error, value } = createStudentSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return next(error)
    }

    // schema অনুযায়ী value.studentData আসবেই
    const result = await UsersServices.createStudentIntoDB(
      value.studentData
    );
    
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Student created successfully',
      data: result,
    });

  } catch (error) {
    next(error)
  }
};


export const UsersController = {
  createStudent,
};
