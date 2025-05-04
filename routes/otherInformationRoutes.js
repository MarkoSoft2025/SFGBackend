const express = require('express');
const otherInformationController = require('../controllers/otherInformationController');

const router = express.Router();

// CRUD Endpoints
router.post('/', otherInformationController.createOtherInformation);
router.get('/', otherInformationController.getAllOtherInformation);
router.get('/EmpID/:empid', otherInformationController.getAllOtherInformationByEmpID);
router.get('/:id', otherInformationController.getOtherInformationById);
router.put('/:id', otherInformationController.updateOtherInformation);
router.delete('/:id',otherInformationController.deleteOtherInformation);

module.exports = router;
