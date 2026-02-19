import { model, Schema } from "mongoose";
import { AcademinDepartmentInterface } from "./academinDepert.interface";


export const academinSchema=new Schema<AcademinDepartmentInterface>({
    name:{type:String, required:true},
    academinFacality:{type:Schema.Types.ObjectId, ref:"AcademicFaculty", required:true},

    
},{timestamps:true})


academinSchema.pre('save', async function() {
    // Example pre-save hook logic

    const existingDepartment= await academinDepertModel.findOne({name:this.name});
    if(existingDepartment){
        throw new Error("A department with this name already exists");
    }
  
});


export const academinDepertModel = model<AcademinDepartmentInterface>('AcademinDepartment', academinSchema);