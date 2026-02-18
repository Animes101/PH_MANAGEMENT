import { model, Schema } from "mongoose";
import { AcademinDepartmentInterface } from "./academinDepert.interface";


export const academinSchema=new Schema<AcademinDepartmentInterface>({
    name:{type:String, required:true},
    academinFacality:{type:Schema.Types.ObjectId, ref:"AcademicFaculty", required:true},

    
},{timestamps:true})



export const academinDepertModel = model<AcademinDepartmentInterface>('AcademinDepartment', academinSchema);