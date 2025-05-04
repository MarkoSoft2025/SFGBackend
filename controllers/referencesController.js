const References = require('../models/References');

module.exports = {
  createReferences: (req, res) => {
    References.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating References:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'References Created Successfully', referencesID: req.body.referencesID });
    });
  },

  getAllReferences: (req, res) => {
    References.getAll((err, results) => {
      if (err) {
        console.error('Error fetching References:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getAllReferencesByEmpID: (req, res) => {
    References.getAllByEmpId(req.params.empid, (err, result) => {
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

  getReferencesById: (req, res) => {
    References.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching References:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'References not found' });
      }
      res.json(result);
    });
  },

  updateReferences: (req, res) => {
    References.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating References:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'References updated successfully' });
    });
  },

  deleteReferences: (req, res) => {
    References.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting References:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'References deleted successfully' });
    });
  },
};
