const OtherInformation = require('../models/OtherInformation');


module.exports = {
  createOtherInformation: (req, res) => {
    OtherInformation.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Other Information:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Other Information Created Successfully', otherInformationID: req.body.otherInformationID });
    });
  },

  getAllOtherInformation: (req, res) => {
    OtherInformation.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Other Information:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getAllOtherInformationByEmpID: (req, res) => {
    OtherInformation.getAllByEmpId(req.params.empid, (err, result) => {
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

  getOtherInformationById: (req, res) => {
    OtherInformation.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Other Information:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Other Information not found' });
      }
      res.json(result);
    });
  },

  updateOtherInformation: (req, res) => {
    OtherInformation.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Other Information:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Other Information updated successfully' });
    });
  },

  deleteOtherInformation: (req, res) => {
    OtherInformation.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Other Information:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Other Information deleted successfully' });
    });
  },
};
