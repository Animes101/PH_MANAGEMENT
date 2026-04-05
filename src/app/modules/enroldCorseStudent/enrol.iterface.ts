import { Types } from "mongoose";

export type Tgrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F' | 'N/A';
export type corseMark={
    classTest1:number;
    classTest2:number;
    classTest3:number;
    midTerm:number;
    finalExam:number;
}

export type EnrolCourseStudent = {
    semesterRegistration: Types.ObjectId;
    academinSemester: Types.ObjectId;
    offerCorse: Types.ObjectId;
    corse: Types.ObjectId;
    student: Types.ObjectId;
    faculity: Types.ObjectId;
    isEnrollerd:boolean;
    corseMark:corseMark;
    grade:Tgrade;
    isComplated:boolean;
}