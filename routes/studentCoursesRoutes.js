const express = require('express');
const StudentCoursesController = require('../controllers/studentCoursesController');

const router = express.Router();

// CRUD Endpoints
router.get('/', StudentCoursesController.getAllStudentCourses);
router.post('/', StudentCoursesController.createStudentCourses);
router.get('/SearchStudents/:schoolyear/:semester/:college/:department/:page', StudentCoursesController.getSearchForTransferStudents);
router.get('/ViewStudents/:id/:courseName/:schoolyear/:semester', StudentCoursesController.getJoinStudents);
router.get('/ViewStatusStudents/:status/:courseName/:schoolyear/:semester', StudentCoursesController.getStatusStudents);
router.get('/ViewAllStudents/:schoolyear/:semester', StudentCoursesController.getJoinAllStudents);
router.get('/ViewAllCourseStudents/:schoolyear/:semester', StudentCoursesController.getAllCourseStudents);
router.get('/ViewByCourseName/:schoolyear/:semester/:courseName', StudentCoursesController.getByCourseName);
router.get('/Courses/:id', StudentCoursesController.getStudentCoursesJoin);
router.get('/:id', StudentCoursesController.getStudentCoursesById);
router.put('/:id', StudentCoursesController.updateStudentCourses);
router.delete('/:id', StudentCoursesController.deleteStudentCourses);

module.exports = router;