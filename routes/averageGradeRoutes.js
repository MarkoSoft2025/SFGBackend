const express = require('express');
const AverageGrade = require('../controllers/averageGradeController');

const router = express.Router();

// CRUD Endpoints
router.get('/', AverageGrade.getAllAverageGrade);
router.post('/', AverageGrade.createAverageGrade);
router.get('/:id', AverageGrade.getAverageGradeById);
router.put('/:id', AverageGrade.updateAverageGrade);
router.delete('/:id', AverageGrade.deleteAverageGrade);


module.exports = router;