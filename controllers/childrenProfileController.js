const ChildrenProfile = require('../models/ChildrenProfile');

module.exports = {
  createChildrenProfile: (req, res) => {
    ChildrenProfile.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Children Profile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Children Profile Created Successfully', childrenprofile_id: req.body.childrenprofile_id });
    });
  },

  getAllChildrenProfilesByEmpID: (req, res) => {
    ChildrenProfile.getAllByEmpId(req.params.empid, (err, result) => {
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


  getAllChildrenProfiles: (req, res) => {
    ChildrenProfile.getAll((err, results) => {
      if (err) {
        console.error('Error fetching ChildrenProfiles:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getChildrenProfileById: (req, res) => {
    ChildrenProfile.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching ChildrenProfile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Children Profile not found' });
      }
      res.json(result[0]);
    });
  },

  updateChildrenProfile: (req, res) => {
    ChildrenProfile.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Children Profile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Children Profile updated successfully' });
    });
  },

  deleteChildrenProfile: (req, res) => {
    ChildrenProfile.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting ChildrenProfile:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'ChildrenProfile deleted successfully' });
    });
  },
};
