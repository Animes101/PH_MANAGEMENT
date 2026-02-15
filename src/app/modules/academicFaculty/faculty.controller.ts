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


export const academicFacultyController={
    createAcademicFaculty,
}