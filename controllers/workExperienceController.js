const WorkExperience = require('../models/WorkExperience');

module.exports = {
    createWorkExperience: (req, res) => {
        WorkExperience.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Work Experience:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Work Experience Created Successfully', workexperienceid: req.body.workexperienceid });
    });
  },

  getAllWorkExperience: (req, res) => {
    WorkExperience.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Work Experience:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

getAllWorkExperienceByEmpID: (req, res) => {
  WorkExperience.getAllByEmpId(req.params.empid, (err, result) => {
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


  getWorkExperienceById: (req, res) => {
    WorkExperience.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Work Experience:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Disciplines not found' });
      }
      res.json(result);
    });
  },

  updateWorkExperience: (req, res) => {
    WorkExperience.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Work Experience:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Work Experience updated successfully' });
    });
  },

  deleteWorkExperience: (req, res) => {
    WorkExperience.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Work Experience:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Work Experience deleted successfully' });
    });
  },
};
