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


export const  RegisterColtroller={
    createRegister,
}