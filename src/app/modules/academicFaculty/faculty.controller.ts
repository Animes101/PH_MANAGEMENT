import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/respons";
import { academicFacultyServices } from "./faculty.services";


const createAcademicFaculty= catchAsync(async(req , res)=>{

    const result= await academicFacultyServices.createAcademicFacultyDb(req.body);
     sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Academic Faculty created successfully",
            data: result,
        });
})

const getAllAcademicFaculty= catchAsync(async(req , res)=>{

    const result= await academicFacultyServices.getAllAcademicFacultyDb();

    
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Academic Faculty retrieved successfully",
            data: result,
        });
})


const getSingleAcademicFaculty= catchAsync(async(req , res)=>{

    const result= await academicFacultyServices.getSingleAcademicFacultyDb(req.params.id as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty retrieved successfully",
        data: result,
    });
})

const updateAcademicFaculty= catchAsync(async(req , res)=>{

    console.log(req.params.id);
    console.log(req.body)

    const result= await academicFacultyServices.updateAcademincFacultyDb(req.params.id as string, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty updated successfully",
        data: result,
    });
})

export const academicFacultyController={
    createAcademicFaculty,
    getAllAcademicFaculty,
    updateAcademicFaculty,
    getSingleAcademicFaculty

}