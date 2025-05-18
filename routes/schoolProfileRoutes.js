const express = require('express');
const schoolProfile = require('../controllers/SchoolProfileController');

const router = express.Router();

// CRUD Endpoints
router.post('/', schoolProfile.createSchoolProfile);
router.get('/', schoolProfile.getAllSchoolProfile);
router.get('/:id', schoolProfile.getSchoolProfileById);
router.put('/:id', schoolProfile.updateSchoolProfile);
router.delete('/:id', schoolProfile.deleteSchoolProfile);

module.exports = router;
