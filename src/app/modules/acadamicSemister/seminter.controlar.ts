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

const getAllAcademicSemesters= catchAsync(async(req:Request, res:Response)=>{

    const result=await createAcademicSemesterSercices.getAllAcademicSemesters();

    res.status(200).json({
        success:true,
        message:"academic semester retrived successfully",
        data:result
    })
})

const getSingleAcademicSemester=catchAsync(async(req:Request, res:Response)=>{

    const id=req.params.id;
    const result=await createAcademicSemesterSercices.getSingleAcademicSemester(id as string);

    res.status(201).json({

        success:true,
        message:"academic semester retrived successfully",
        data:result
    })
})


export const academinSemesterController={

    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
}