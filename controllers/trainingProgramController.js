const TrainingPrograms = require('../models/TrainingPrograms');

module.exports = {
  createTrainingPrograms: (req, res) => {
    TrainingPrograms.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Training Programs:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Training Programs Created Successfully', trainingProgramID: req.body.trainingProgramID });
    });
  },

  getAllTrainingPrograms: (req, res) => {
    TrainingPrograms.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Training Programs:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getAllTrainingProgramsByEmpID: (req, res) => {
    TrainingPrograms.getAllByEmpId(req.params.empid, (err, result) => {
        if (err) {
          console.error('Error fetching ChildrenProfile:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        if (!result) {
          return res.status(404).json({ message: 'Children Profile not found' });
        }
        res.json(result);
      });
    },

  getTrainingProgramsById: (req, res) => {
    TrainingPrograms.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Training Programs:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Training Programs not found' });
      }
      res.json(result);
    });
  },

  updateTrainingPrograms: (req, res) => {
    TrainingPrograms.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Training Programs', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Training Programs updated successfully' });
    });
  },

  deleteTrainingPrograms: (req, res) => {
    TrainingPrograms.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Training Programs:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Training Programs deleted successfully' });
    });
  },
};
