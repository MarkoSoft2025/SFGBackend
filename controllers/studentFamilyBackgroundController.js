const StudentFamilyBackground = require('../models/StudentFamilyBackground');

module.exports = {

  getAllStudentFamilyBackground: (req, res) => {
    StudentFamilyBackground.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createStudentFamilyBackground: (req, res) => {
    StudentFamilyBackground.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Student Family Background created successfully', familyBackgroundID: req.body.familyBackgroundID });
    });
  },

  getStudentFamilyBackgroundById: (req, res) => {
    StudentFamilyBackground.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Student Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Student Family Background not found' });
      }
      res.json(result);
    });
  },

  updateStudentFamilyBackground: (req, res) => {
    StudentFamilyBackground.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Student Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Student Family Background updated successfully' });
    });
  },

  deleteStudentFamilyBackground: (req, res) => {
    StudentFamilyBackground.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Student Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Student Family Background deleted successfully' });
    });
  },

};
