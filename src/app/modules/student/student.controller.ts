import { Request, Response } from 'express';
import { studentService } from './student.service';

const getAllStudents =async (req: Request, res: Response) => {

  const result = await studentService.getAllStudents();

  res.status(200).json({
    success: true,
    message: 'All students retrieved successfully',
    data: result,
  });
};


const getSingleStudent= async (req:Request, res:Response)=>{

    const {_id}=req.params;

    const result= await studentService.getSingleStudent(_id as string)
    res.status(200).json({
        success:true,
        message:"Single student retrieved successfully",
        data:result
    })
}

export const studentController = {
  getAllStudents,
  getSingleStudent,

};
