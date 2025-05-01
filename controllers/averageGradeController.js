const AverageGrade = require('../models/AverageGrade');

module.exports = {

  getAllAverageGrade: (req, res) => {
    AverageGrade.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createAverageGrade: (req, res) => {
    AverageGrade.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'AverageGrade created successfully', averageGradeID: req.body.averageGradeID });
    });
  },

  getAverageGradeById: (req, res) => {
    AverageGrade.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching AverageGrade:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'AverageGrade not found' });
      }
      res.json(result);
    });
  },

  updateAverageGrade: (req, res) => {
    AverageGrade.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating AverageGrade:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'AverageGrade updated successfully' });
    });
  },

  deleteAverageGrade: (req, res) => {
    AverageGrade.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting AverageGrade:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'AverageGrade deleted successfully' });
    });
  },

};
