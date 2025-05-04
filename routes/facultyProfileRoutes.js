const express = require('express');
const facultyProfileController = require('../controllers/FacultyProfileController');

const router = express.Router();

// CRUD Endpoints
router.post('/', facultyProfileController.createFacultyProfile);
router.get('/', facultyProfileController.getAllFacultyProfile);
router.get('/:id', facultyProfileController.getFacultyProfileById);
router.put('/:id', facultyProfileController.updateFacultyProfile);
router.delete('/:id', facultyProfileController.deleteFacultyProfile);

module.exports = router;
