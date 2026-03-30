import { Schema, model, Types } from "mongoose";

export type Tgrade =
  | "A+" | "A" | "A-" 
  | "B+" | "B" | "B-"
  | "C+" | "C" | "C-"
  | "D+" | "D" | "D-"
  | "F";

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
  classTest1: { type: Number, required: true },
  classTest2: { type: Number, required: true },
  classTest3: { type: Number, required: true },
  midTerm: { type: Number, required: true },
  finalExam: { type: Number, required: true },
});

const EnrolCourseStudentSchema = new Schema<EnrolCourseStudent>(
  {
    semesterRegistration: { type: Schema.Types.ObjectId, required: true, ref: "SemesterRegistration" },
    academinSemester: { type: Schema.Types.ObjectId, required: true, ref: "AcademicSemester" },
    academicDepartment: { type: Schema.Types.ObjectId, required: true, ref: "AcademicDepartment" },
    offerCorse: { type: Schema.Types.ObjectId, required: true, ref: "OfferCourse" },
    corse: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    student: { type: Schema.Types.ObjectId, required: true, ref: "Student" },
    faculity: { type: Schema.Types.ObjectId, required: true, ref: "Faculty" },

    isEnrollerd: { type: Boolean, default: false },

    corseMark: { type: CourseMarkSchema, required: true },

    grade: {
      type: String,
      enum: [
        "A+", "A", "A-",
        "B+", "B", "B-",
        "C+", "C", "C-",
        "D+", "D", "D-",
        "F",
      ],
      required: true,
    },

    isComplated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const EnrolCourseStudentModel = model<EnrolCourseStudent>(
  "EnrolCourseStudent",
  EnrolCourseStudentSchema
);