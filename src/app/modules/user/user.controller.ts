import { NextFunction, Request, Response } from 'express';
import { UsersServices } from './user.services';
import { createStudentSchema } from '../student/student.validation';
import sendResponse from '../../utility/respons';
import catchAsync from '../../utility/catchAsync';
import { createTeacherValidation } from '../facality/joi.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { sendImageToCludeNary } from '../../utils/multer';



const createStudent =catchAsync( async (req: Request, res: Response, next:NextFunction) => {

  
    const { error, value } = createStudentSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      next(error)
    }


    // schema অনুযায়ী value.studentData আসবেই

    const file=req.file;

  

    

    const result = await UsersServices.createStudentIntoDB(
      req.body.studentData, file
    );
    
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Student created successfully',
      data: result,
    }); 
 
});

const createFacality = catchAsync(async (req, res, next: NextFunction) => {

  const { error, value } = createTeacherValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(error);
  }

  const result = await UsersServices.createFacalityintoDb(value);

  res.status(200).json({
    success: true,
    message: "Faculty created successfully",
    data: result,
  });

});

//create Admin 

const createAdmin = catchAsync(async (req, res, next: NextFunction) => {

  const { error, value } = createAdminValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(error);
  }

  const result = await UsersServices.createAdminIntoDB(value);

  res.status(200).json({
    success: true,
    message: "Faculty created successfully",
    data: result,
  });

});


const ageMe = catchAsync(async (req, res,) => {

  const {userId, userRole}=req.user

 

  const result = await UsersServices.getMe(userId, userRole);

  res.status(200).json({
    success: true,
    message: "Find  successfully",
    data: result,
  });

});






export const UsersController = {
  createStudent,
  createFacality,
  createAdmin,
  ageMe
};