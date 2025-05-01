const OtherInformation = require('../models/OtherInformation');

module.exports = {

  getAllOtherInformation: (req, res) => {
    OtherInformation.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createOtherInformation: (req, res) => {
    OtherInformation.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'OtherInformation created successfully', otherInformationID: req.body.otherInformationID });
    });
  },

  getOtherInformationById: (req, res) => {
    OtherInformation.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching OtherInformation:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'OtherInformation not found' });
      }
      res.json(result);
    });
  },

  updateOtherInformation: (req, res) => {
    OtherInformation.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating OtherInformation:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'OtherInformation updated successfully' });
    });
  },

  deleteOtherInformation: (req, res) => {
    OtherInformation.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting OtherInformation:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'OtherInformation deleted successfully' });
    });
  },

};
