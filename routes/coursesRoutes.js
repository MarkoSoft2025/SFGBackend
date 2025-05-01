const express = require('express');
const CoursesController = require('../controllers/coursesController');

const router = express.Router();

// CRUD Endpoints
router.get('/', CoursesController.getAllCourses);
router.post('/', CoursesController.createCourses);
router.get('/department/:department', CoursesController.getByDepartment);
router.get('/:id', CoursesController.getCoursesById);
router.put('/:id', CoursesController.updateCourses);
router.delete('/:id', CoursesController.deleteCourses);

module.exports = router;