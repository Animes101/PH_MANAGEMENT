import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/respons";
import { corseServices } from "./corse.services";


const createCorse=catchAsync(async(req,res)=>{

    const result=await corseServices.createCorseIntoDb(req.body)

    sendResponse(res,{
        statusCode: 201,
    success: true,
    message: 'create Corse Successfuly',
    data: result

    })
})


export const corseController={
    createCorse

}