const Credentials = require('../models/Credentials');

module.exports = {

  getAllCredentials: (req, res) => {
    Credentials.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createCredentials: (req, res) => {
    Credentials.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Credentials created successfully', credentialsID: req.body.credentialsID });
    });
  },

  getCredentialsById: (req, res) => {
    Credentials.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Credentials:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Credentials not found' });
      }
      res.json(result);
    });
  },

  updateCredentials: (req, res) => {
    Credentials.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Credentials:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Credentials updated successfully' });
    });
  },

  deleteCredentials: (req, res) => {
    Credentials.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Credentials:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Credentials deleted successfully' });
    });
  },

};
