import { Schema, model } from 'mongoose';
import { Guardian, IStudent } from './student.interface';


// Mongoose Schema
const GuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  phone: { type: String, required: true },
});

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    id:{type:String, required:true},
     user: {type:Schema.Types.ObjectId, required:true, unique:true, ref:'UserModel'},
    age: { type: Number, required: true },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], required: true },
    dateOfBirth: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    address: { type: String, required: true },
    grade: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    guardian: { type: GuardianSchema, required: true },
    department: { type: String, required: true },
    isActive: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);



// Mongoose Model
export const StudentModel = model<IStudent>('Student', StudentSchema);