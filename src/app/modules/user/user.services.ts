import { IStudent } from "../student/student.interface"
import { UserModel } from "./user.model"

const createStudentIntoDB=async (studentData:IStudent)=>{

    const result=await UserModel(studentData);

    return result;


}





export const UsersServices={
    createStudentIntoDB
}