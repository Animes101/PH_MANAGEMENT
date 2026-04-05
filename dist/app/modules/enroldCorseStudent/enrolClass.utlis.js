"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateGradePoint = (totalMarks) => {
    if (totalMarks >= 80) {
        const result = {
            grade: "A+",
            gradePoint: 4.00
        };
        return result;
    }
    else if (totalMarks >= 75) {
        const result = {
            grade: "A",
            gradePoint: 3.75
        };
        return result;
    }
    else if (totalMarks >= 70) {
        const result = {
            grade: "A-",
            gradePoint: 3.50
        };
        return result;
    }
    else if (totalMarks >= 65) {
        const result = {
            grade: "B+",
            gradePoint: 3.25
        };
        return result;
    }
    else if (totalMarks >= 60) {
        const result = {
            grade: "B",
            gradePoint: 3.00
        };
        return result;
    }
    else if (totalMarks >= 55) {
        const result = {
            grade: "B-",
            gradePoint: 2.75
        };
        return result;
    }
    else if (totalMarks >= 50) {
        const result = {
            grade: "C+",
            gradePoint: 2.50
        };
        return result;
    }
    else if (totalMarks >= 45) {
        const result = {
            grade: "C",
            gradePoint: 2.25
        };
        return result;
    }
    else if (totalMarks >= 40) {
        const result = {
            grade: "D",
            gradePoint: 2.00
        };
        return result;
    }
    else if (totalMarks >= 0) {
        const result = {
            grade: "F",
            gradePoint: 0.00
        };
        return result;
    }
    else {
        const result = {
            grade: "N/A",
            gradePoint: 0.00
        };
        return result;
    }
};
exports.default = calculateGradePoint;
