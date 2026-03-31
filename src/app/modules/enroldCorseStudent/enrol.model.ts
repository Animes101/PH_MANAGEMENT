import { Schema, model, Types } from "mongoose";

export type Tgrade =
  | "A+" | "A" | "A-" 
  | "B+" | "B" | "B-"
  | "C+" | "C" | "C-"
  | "D+" | "D" | "D-"
  | "F" | "N/A";

export type EnrolCorseMark = {
  classTest1: number;
  classTest2: number;
  classTest3: number;
  midTerm: number;
  finalExam: number;
};

export type EnrolCourseStudent = {
  semesterRegistration: Types.ObjectId;
  academinSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  offerCorse: Types.ObjectId;
  corse: Types.ObjectId;
  student: Types.ObjectId;
  faculity: Types.ObjectId;
  isEnrollerd: boolean;
  corseMark: EnrolCorseMark;
  grade: Tgrade;
  isComplated: boolean;
};

// ---------------- SCHEMA -------------------

const CourseMarkSchema = new Schema<EnrolCorseMark>({
  classTest1: { type: Number, default:0},
  classTest2: { type: Number, default:0},
  classTest3: { type: Number, default:0},
  midTerm: { type: Number,  default:0},
  finalExam: { type: Number, default:0},
});

const EnrolCourseStudentSchema = new Schema<EnrolCourseStudent>(
  {
    semesterRegistration: { type: Schema.Types.ObjectId, required: true, ref: "SemesterRegistration" },
    academinSemester: { type: Schema.Types.ObjectId, required: true, ref: "AcademicSemester" },
    offerCorse: { type: Schema.Types.ObjectId, required: true, ref: "OfferCourse" },
    corse: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    student: {  type: Schema.Types.ObjectId, required: true, ref: "Student" },
    faculity: { type: Schema.Types.ObjectId, required: true, ref: "Faculty" },

    isEnrollerd: { type: Boolean, default: false },

    corseMark: { type: CourseMarkSchema, default: () => ({}) },

    grade: {
      type: String,
      enum: [
        "A+", "A", "A-",
        "B+", "B", "B-",
        "C+", "C", "C-",
        "D+", "D", "D-",
        "F","N/A"
      ],
      default: "N/A",
    },

    isComplated: { type: Boolean, default: false },
  },
  { timestamps: true }
  
);


export const EnrolCourseStudentModel = model<EnrolCourseStudent>(
  "EnrolCourseStudent",
  EnrolCourseStudentSchema
);