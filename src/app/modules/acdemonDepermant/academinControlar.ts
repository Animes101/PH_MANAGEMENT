import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/respons";
import { academinServices } from "./academinDepertMent.services";



const createAcademinDepartment= catchAsync(async(req , res)=>{
    
    const result=await academinServices.createAcademinDepartmentDb(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Academic Department created successfully",
        data: result,
    });

   
})

const ageAllAcademinDepartment=catchAsync(async(req , res)=>{

    const result=await academinServices.getAllAcademinDepartmentDb();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department retrieved successfully",
        data: result,
    });
})

const getSingleAcademinDepartment=catchAsync(async(req , res)=>{
    const result=await academinServices.getSingleAcademinDepartmentDb(req.params.id as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department retrieved successfully",
        data: result,
    });
})

const updateAcademinDepartment=catchAsync(async(req , res)=>{
    const result=await academinServices.updateAcademinDepartmentDb(req.params.id as string, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Department updated successfully",
        data: result,
    });
})



export const academinControlar={

    createAcademinDepartment,
    ageAllAcademinDepartment,
    getSingleAcademinDepartment,
    updateAcademinDepartment,
}