import { model, Schema } from "mongoose";
import { TassignFacalitis, TCorse, TpreRequiesitesCorse } from "./corse.interface";


const preRequisitesSchema=new Schema<TpreRequiesitesCorse>({
    corse:{
        type:Schema.Types.ObjectId,
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})

const CorseSchema=new Schema<TCorse>({

    title:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    prefix:{
        type:String,
        required:true,
        
    },
    code:{
        type:Number,
        required:true,
    },
    preRequisiteCorse:[preRequisitesSchema]

})



export const  CorseModel= model<TCorse>('corse', CorseSchema);


const corseFacalitisSchema=new Schema<TassignFacalitis>({

    corse:{
        type:Schema.Types.ObjectId,
        unique:true, 
        ref:'corse'
    },
    faculties:{
        type:[Schema.Types.ObjectId],
        ref:'teachers'
    }
})



export const  CorseFacultiesModel= model<TassignFacalitis>('CorseFacalitis', corseFacalitisSchema);