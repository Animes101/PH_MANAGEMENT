import { Request, Response } from 'express';
import { UsersServices } from './user.services';
import { createUserValidation } from './user.validation';
import { createStudentSchema } from '../student/student.validation';



const createStudent = async (req: Request, res: Response) => {
  try {
    const { error, value } = createStudentSchema.validate(req.body, {
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
    const result = await UsersServices.createStudentIntoDB(
      value.studentData
    );

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};


export const UsersController = {
  createStudent,
};
