const FacultyProfile = require('../models/FacultyProfile');

module.exports = {
  createFacultyProfile: (req, res) => {
    const data = req.body;
  
    // Remove undefined, null, or empty fields from the request body
    const sanitizedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );
  
    FacultyProfile.create(sanitizedData, (err, result) => {
      if (err) {
        console.error('Error creating Faculty Profile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.status(201).json({ 
        message: 'Faculty Profile created successfully', 
        facultyProfileID: result.insertId // Use the result's insertId to get the created ID
      });
    });
  },

  getAllFacultyProfile: (req, res) => {
    FacultyProfile.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Faculty Profile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getFacultyProfileById: (req, res) => {
    FacultyProfile.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Faculty Profile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Faculty Profile not found' });
      }
      res.json(result);
    });
  },

  updateFacultyProfile: (req, res) => {
    FacultyProfile.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Faculty Profile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Faculty Profile updated successfully' });
    });
  },

  deleteFacultyProfile: (req, res) => {
    FacultyProfile.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Faculty Profile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Faculty Profile deleted successfully' });
    });
  },
};
