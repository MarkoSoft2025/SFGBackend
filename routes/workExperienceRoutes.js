const express = require('express');
const workExperienceController = require('../controllers/workExperienceController');

const router = express.Router();

// CRUD Endpoints
router.post('/', workExperienceController.createWorkExperience);
router.get('/', workExperienceController.getAllWorkExperience);
router.get('/EmpID/:empid', workExperienceController.getAllWorkExperienceByEmpID);
router.get('/:id', workExperienceController.getWorkExperienceById);
router.put('/:id', workExperienceController.updateWorkExperience);
router.delete('/:id',workExperienceController.deleteWorkExperience);

module.exports = router;
