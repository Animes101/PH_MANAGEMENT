import { Schema } from "mongoose";
import { AcademinDepartmentInterface } from "./academinDepert.interface";


export const academinSchema=new Schema<AcademinDepartmentInterface>({
    name:{type:String, required:true},
    academinFacality:{type:String, required:true},
    
    
},{timestamps:true})