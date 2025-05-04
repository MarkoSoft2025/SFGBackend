const express = require('express');
const familyBackgroundController = require('../controllers/familyBackgroundController');

const router = express.Router();

// CRUD Endpoints
router.post('/', familyBackgroundController.createFamilyBackground);
router.get('/', familyBackgroundController.getAllFamilyBackground);
router.get('/:id', familyBackgroundController.getFamilyBackgroundById);
router.put('/:id', familyBackgroundController.updateFamilyBackground);
router.delete('/:id', familyBackgroundController.deleteFamilyBackground);

module.exports = router;
