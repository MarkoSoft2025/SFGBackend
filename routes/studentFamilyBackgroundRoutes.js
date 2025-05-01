const express = require('express');
const StudentFamilyBackgroundController = require('../controllers/studentFamilyBackgroundController');

const router = express.Router();

// CRUD Endpoints
router.get('/', StudentFamilyBackgroundController.getAllStudentFamilyBackground);
router.post('/', StudentFamilyBackgroundController.createStudentFamilyBackground);
router.get('/:id', StudentFamilyBackgroundController.getStudentFamilyBackgroundById);
router.put('/:id', StudentFamilyBackgroundController.updateStudentFamilyBackground);
router.delete('/:id', StudentFamilyBackgroundController.deleteStudentFamilyBackground);


module.exports = router;
