const express = require('express');
const educationalBackgroundController = require('../controllers/educationalBackgroundController');

const router = express.Router();

// CRUD Endpoints
router.post('/', educationalBackgroundController.createEducationalBackground);
router.get('/', educationalBackgroundController.getAllEducationalBackground);
router.get('/EmpID/:empid', educationalBackgroundController.getAllEducationalBackgroundByEmpID);
router.get('/:id', educationalBackgroundController.getEducationalBackgroundById);
router.put('/:id', educationalBackgroundController.updateEducationalBackground);
router.delete('/:id', educationalBackgroundController.deleteEducationalBackground);

module.exports = router;
