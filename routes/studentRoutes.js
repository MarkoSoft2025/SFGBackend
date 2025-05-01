const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

// CRUD Endpoints
router.post('/login', studentController.login);
router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById); // Keep dynamic route last
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
