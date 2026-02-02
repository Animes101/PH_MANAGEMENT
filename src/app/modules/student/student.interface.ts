
// Guardian type
export type Guardian = {
  fatherName: string;
  motherName: string;
  phone: string;
};

// TypeScript interface
export interface IStudent extends Document {
  name: string;
  id:string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: string;
  grade: string;
  email: string;
  phoneNumber: string;
  guardian: Guardian;
  department: string;
  isActive: 'active' | 'inactive';
  
}

