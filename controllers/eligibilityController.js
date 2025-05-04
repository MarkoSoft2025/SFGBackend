const Eligibility = require('../models/Eligibility');


module.exports = {
  createEligibility: (req, res) => {
    Eligibility.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Eligibility:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Eligibility Created Successfully', EligibilityID: req.body.EligibilityID });
    });
  },

  getAllEligibility: (req, res) => {
    Eligibility.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Eligibility:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

getAllEligibilityByEmpID: (req, res) => {
  Eligibility.getAllByEmpId(req.params.empid, (err, result) => {
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

  getEligibilityById: (req, res) => {
    Eligibility.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Eligibility:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Eligibility not found' });
      }
      res.json(result);
    });
  },

  updateEligibility: (req, res) => {
    Eligibility.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Eligibility:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Eligiblity updated successfully' });
    });
  },

  deleteEligibility: (req, res) => {
    Eligibility.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Eligiblity:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Eligibility deleted successfully' });
    });
  },
};
