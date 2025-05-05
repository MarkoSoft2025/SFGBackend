const express = require('express');
const subjectsController = require('../controllers/subjectsController');

const router = express.Router();

// CRUD Endpoints
router.post('/', subjectsController.createSubjects);
router.get('/', subjectsController.getAllSubjects);
router.get('/:id', subjectsController.getSubjectsById);
router.put('/:id', subjectsController.updateSubjects);
router.delete('/:id', subjectsController.deleteSubjects);

module.exports = router;
