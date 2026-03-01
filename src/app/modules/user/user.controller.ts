import { NextFunction, Request, Response } from 'express';
import { UsersServices } from './user.services';
import { createStudentSchema } from '../student/student.validation';
import sendResponse from '../../utility/respons';
import catchAsync from '../../utility/catchAsync';



const createStudent =catchAsync( async (req: Request, res: Response, next:NextFunction) => {
  
    // const { error, value } = createStudentSchema.validate(req.body, {
    //   abortEarly: false,
    // });

    // if (error) {
    //   next(error)
    // }


    // schema অনুযায়ী value.studentData আসবেই

    const result = await UsersServices.createStudentIntoDB(
      req.body.studentData
    );
    
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Student created successfully',
      data: result,
    }); 
 
});


export const UsersController = {
  createStudent,
};
