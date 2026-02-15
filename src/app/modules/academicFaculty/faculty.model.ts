import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './faculty.interface';



const academinSchema = new Schema<IAcademicFaculty>(
    {
        name: { type: String, required: true },

    },
  { timestamps: true } // auto adds createdAt & updatedAt
);



// Mongoose Model
export const AcademicFacultyModel = model<IAcademicFaculty>('AcademicFaculty', academinSchema);