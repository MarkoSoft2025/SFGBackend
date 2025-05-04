const VoluntaryWork = require('../models/VoluntaryWork');

module.exports = {
  createVoluntaryWork: (req, res) => {
    VoluntaryWork.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Voluntary Work:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Voluntary Work Created Successfully', voluntaryworkid: req.body.voluntaryworkid });
    });
  },

  getAllVoluntaryWork: (req, res) => {
    VoluntaryWork.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Voluntary Work:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getAllVoluntaryWorkByEmpID: (req, res) => {
    VoluntaryWork.getAllByEmpId(req.params.empid, (err, result) => {
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


  getVoluntaryWorkById: (req, res) => {
    VoluntaryWork.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Voluntary Work:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Voluntary Work not found' });
      }
      res.json(result);
    });
  },

  updateVoluntaryWork: (req, res) => {
    VoluntaryWork.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Voluntary Work:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Voluntary Work updated successfully' });
    });
  },

  deleteVoluntaryWork: (req, res) => {
    VoluntaryWork.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Voluntary Work:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Voluntary Work deleted successfully' });
    });
  },
};
