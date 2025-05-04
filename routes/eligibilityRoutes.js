const express = require('express');
const eligibilityController = require('../controllers/eligibilityController');

const router = express.Router();

// CRUD Endpoints
router.post('/', eligibilityController.createEligibility);
router.get('/', eligibilityController.getAllEligibility);
router.get('/EmpID/:empid', eligibilityController.getAllEligibilityByEmpID);
router.get('/:id', eligibilityController.getEligibilityById);
router.put('/:id', eligibilityController.updateEligibility);
router.delete('/:id', eligibilityController.deleteEligibility);

module.exports = router;
