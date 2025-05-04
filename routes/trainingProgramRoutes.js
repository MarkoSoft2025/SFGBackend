const express = require('express');
const trainingProgramController = require('../controllers/trainingProgramController');

const router = express.Router();

// CRUD Endpoints
router.post('/', trainingProgramController.createTrainingPrograms);
router.get('/', trainingProgramController.getAllTrainingPrograms);
router.get('/EmpID/:empid', trainingProgramController.getAllTrainingProgramsByEmpID);
router.get('/:id', trainingProgramController.getTrainingProgramsById);
router.put('/:id', trainingProgramController.updateTrainingPrograms);
router.delete('/:id', trainingProgramController.deleteTrainingPrograms);

module.exports = router;
