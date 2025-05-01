const express = require('express');
const OtherInformationController = require('../controllers/otherInformationController');

const router = express.Router();

// CRUD Endpoints
router.get('/', OtherInformationController.getAllOtherInformation);
router.post('/', OtherInformationController.createOtherInformation);
router.get('/:id', OtherInformationController.getOtherInformationById);
router.put('/:id', OtherInformationController.updateOtherInformation);
router.delete('/:id', OtherInformationController.deleteOtherInformation);


module.exports = router;