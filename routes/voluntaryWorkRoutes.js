const express = require('express');
const VoluntaryWorkController = require('../controllers/VoluntaryWorkController');

const router = express.Router();

// CRUD Endpoints
router.post('/', VoluntaryWorkController.createVoluntaryWork);
router.get('/', VoluntaryWorkController.getAllVoluntaryWork);
router.get('/EmpID/:empid', VoluntaryWorkController.getAllVoluntaryWorkByEmpID);
router.get('/:id', VoluntaryWorkController.getVoluntaryWorkById);
router.put('/:id', VoluntaryWorkController.updateVoluntaryWork);
router.delete('/:id', VoluntaryWorkController.deleteVoluntaryWork);

module.exports = router;
