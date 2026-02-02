import { Request, Response } from 'express';
import { UsersServices } from './user.services';



const createStudent = async (req: Request, res: Response) => {
  try {

    const {studentData}=req.body;

    const result=await UsersServices.createStudentIntoDB(studentData)


     // Client e response pathano
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
