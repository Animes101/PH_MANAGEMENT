import { Schema, model } from 'mongoose';
import { IAcademicSemister, TMonth } from './seminter.interface';
import { NextFunction } from 'express';

// month enum array (type-safe)
const months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterSchema = new Schema<IAcademicSemister>(
  {
    name: {
      type: String,
      enum: ['Autumn', 'Summer', 'Fall'],
      required: true,
    },

    code: {
      type: String,
      enum: ['01', '02', '03', '04'],
      required: true,
      unique: true,
    },

    year: {
      type: Number,
      required: true,
    },

    startMonth: {
      type: String,
      enum: months,
      required: true,
    },

    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


academicSemesterSchema.pre('save', async function () {
  const existingSemester = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });

  if (existingSemester) {
    throw new Error('Academic semester already exists');
  }
  
});



export const AcademicSemesterModel = model<IAcademicSemister>(
  'AcademicSemester',
  academicSemesterSchema
);

