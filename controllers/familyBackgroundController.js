const FamilyBackground = require('../models/FamilyBackground');


module.exports = {
  createFamilyBackground: (req, res) => {
    const data = req.body;
  
    // Remove undefined or empty fields from the data object
    const sanitizedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );
  
    FamilyBackground.create(sanitizedData, (err, result) => {
      if (err) {
        console.error('Error creating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ 
        message: 'Family Background Created Successfully', 
        familyBackgroundID: result.insertId 
      });
    });
  },
  

  getAllFamilyBackground: (req, res) => {
    FamilyBackground.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getFamilyBackgroundById: (req, res) => {
    FamilyBackground.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Family Backgroundt:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Family Background not found' });
      }
      res.json(result);
    });
  },

  updateFamilyBackground: (req, res) => {
    FamilyBackground.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Family Background updated successfully' });
    });
  },

  deleteFamilyBackground: (req, res) => {
    FamilyBackground.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Family Background deleted successfully' });
    });
  },
};
