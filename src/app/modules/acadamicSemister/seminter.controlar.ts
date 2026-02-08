import {Request, Response } from "express"
import catchAsync from "../../utility/catchAsync"
import { createAcademicSemesterSercices } from "./semister.services";



const createAcademicSemester = catchAsync(async (req:Request, res:Response)=>{


    const { data } = req.body;


    const result= await createAcademicSemesterSercices.createAcademicSemester(data);

    res.status(200).json({
        success:true,
        message:"academic semester created successfully",
        data:result
    })
}
)


export const academinSemesterController={

    createAcademicSemester
}