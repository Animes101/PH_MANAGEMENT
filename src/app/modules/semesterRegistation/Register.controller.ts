import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/respons";
import { RegisterServices } from "./Register.services";


const createRegister=catchAsync(async(req, res)=>{

    const result= await RegisterServices.createRegisterIntoBd(req.body)

    sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'Register Corse success fully',
    data: result,

    })

})

const upadeRegister=catchAsync(async(req, res)=>{

    const _id= req.params._id as string;

    const result= await RegisterServices.updateRegisterintoDb(_id, req.body)

    sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'Register Corse success fully',
    data: result,

    })

})

const deleteRegister=catchAsync(async(req, res)=>{

    const result= await RegisterServices.createRegisterIntoBd(req.body)

    sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'Register Corse success fully',
    data: result,

    })

})

const getAllReginster=catchAsync(async(req, res)=>{

    const result= await RegisterServices.findAllSingleRegister(req.query)

    sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'Register all Corse  successfully',
    data: result,

    })

})

const getSingleRegister=catchAsync(async(req, res)=>{

    const _id= req.params._id as string
    const result= await RegisterServices.findOneSingleRegister(_id)

    sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'get Single Register successfully',
    data: result,

    })

})



export const  RegisterColtroller={
    createRegister,
    upadeRegister,
    deleteRegister,
    getAllReginster,
     getSingleRegister

}