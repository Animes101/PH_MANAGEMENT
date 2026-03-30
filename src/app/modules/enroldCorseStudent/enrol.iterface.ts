import { Types } from "mongoose";

export type Tgrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F';
export type EnrolCorseMark={
    classTest1:number;
    classTest2:number;
    classTest3:number;
    midTerm:number;
    finalExam:number;
}
export type EnrolCourseStudent = {
    semesterRegistration: Types.ObjectId;
    academinSemester: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    offerCorseId: Types.ObjectId;
    corse: Types.ObjectId;
    student: Types.ObjectId;
    faculity: Types.ObjectId;
    isEnrollerd:boolean;
    corseMark:EnrolCorseMark;
    grade:Tgrade;
    isComplated:boolean;
}