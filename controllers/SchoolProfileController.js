const SchoolProfile = require('../models/SchoolProfile');

module.exports = {

  getAllSchoolProfile: (req, res) => {
    SchoolProfile.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createSchoolProfile: (req, res) => {
    SchoolProfile.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating SchoolProfile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'SchoolProfile created successfully', schoolid: req.body.schoolid });
    });
  },

  getSchoolProfileById: (req, res) => {
    SchoolProfile.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching SchoolProfile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'SchoolProfile not found' });
      }
      res.json(result);
    });
  },

  updateSchoolProfile: (req, res) => {
    SchoolProfile.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating SchoolProfile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'SchoolProfile updated successfully' });
    });
  },

  deleteSchoolProfile: (req, res) => {
    SchoolProfile.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting SchoolProfile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'SchoolProfile deleted successfully' });
    });
  },

};
