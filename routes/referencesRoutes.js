const express = require('express');
const referencesController = require('../controllers/referencesController');

const router = express.Router();

// CRUD Endpoints
router.post('/', referencesController.createReferences);
router.get('/', referencesController.getAllReferences);
router.get('/EmpID/:empid', referencesController.getAllReferencesByEmpID);
router.get('/:id', referencesController.getReferencesById);
router.put('/:id', referencesController.updateReferences);
router.delete('/:id', referencesController.deleteReferences);

module.exports = router;
