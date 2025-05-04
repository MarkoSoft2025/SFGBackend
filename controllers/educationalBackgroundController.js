const EducationalBackground = require('../models/EducationalBackground');

module.exports = {
  createEducationalBackground: (req, res) => {
    EducationalBackground.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Educational Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'EducationalBackground Created Successfully', educationalBackgroundID: req.body.educationalBackgroundID });
    });
  },

  getAllEducationalBackground: (req, res) => {
    EducationalBackground.getAll((err, results) => {
      if (err) {
        console.error('Error fetching EducationalBackground:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getAllEducationalBackgroundByEmpID: (req, res) => {
    EducationalBackground.getAllByEmpId(req.params.empid, (err, result) => {
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

  getEducationalBackgroundById: (req, res) => {
    EducationalBackground.getById(req.params.id, (err, result) => {
        if (err) {
          console.error('Error fetching Educational Background:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        if (!result) {
          return res.status(404).json({ message: 'Educational Background not found' });
        }
        res.json(result);
      });
    },

  updateEducationalBackground: (req, res) => {
    EducationalBackground.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Educational Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Educational Background updated successfully' });
    });
  },

  deleteEducationalBackground: (req, res) => {
    EducationalBackground.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Educational Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Educational Background deleted successfully' });
    });
  },
};
