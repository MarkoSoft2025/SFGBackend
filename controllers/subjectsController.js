const Subjects = require('../models/Subject');


module.exports = {


  createSubjects: (req, res) => {
    Subjects.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Subjects:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Subjects Created Successfully', subjectid: req.body.subjectid });
    });
  },

  getAllSubjects: (req, res) => {
    Subjects.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Subjects:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getSubjectsById: (req, res) => {
    Subjects.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Subjects:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Subjects not found' });
      }
      res.json(result);
    });
  },

  updateSubjects: (req, res) => {
    Subjects.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Subjects:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Subjects updated successfully' });
    });
  },

  deleteSubjects: (req, res) => {
    Subjects.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Subjects:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Subjects deleted successfully' });
    });
  },
};
