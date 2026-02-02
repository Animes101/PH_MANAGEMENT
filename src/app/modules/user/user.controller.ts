import { Request, Response } from 'express';



const createStudent = async (req: Request, res: Response) => {
  try {

    const {studentData}=req.body;

    console.log(studentData);


    
 
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
