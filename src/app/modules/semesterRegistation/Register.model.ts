import mongoose, { model, Schema } from "mongoose";
import { Tregintation } from "./Registation.interFace";
import { registerStatus } from "./Registation.comntance";


 const RegistationSchema= new mongoose.Schema<Tregintation>({

    academinSemister:{
        type: Schema.Types.ObjectId, 
        ref:'academicsemesters', 
        unique:true,
    },
    status:{
        type:String,
        enum:registerStatus,
        default:'UPCOMING'
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true,
    },
    minCredit:{
        type:Number,
        required:true,

    },
    maxCredit:{
        type:Number,
        required:true
    }



})


export const registerModel= model<Tregintation>('registermodel', RegistationSchema)