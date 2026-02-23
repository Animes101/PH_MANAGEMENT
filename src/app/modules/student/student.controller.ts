import { studentService } from './student.service';
import catchAsync from '../../utility/catchAsync';



// ✅ Clean logic
const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudents();

  res.status(200).json({
    success: true,
    message: 'All students retrieved successfully',
    data: result,
  });
});

// ✅ Route parameter handling
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params as { id: string }; 

  const result = await studentService.getSingleStudent(id);

  res.status(200).json({
    success: true,
    message: 'Single student retrieved successfully',
    data: result,
  });
});

const deleteStudent= catchAsync(async(req, res)=>{
  // Logic for deleting a student will go here
  const { id } = req.params as { id: string }; 
  const result= await studentService.deleteStudent(id);
  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
})

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};