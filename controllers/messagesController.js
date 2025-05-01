const Messages = require('../models/StudentMessages');

module.exports = {

  getAllMessages: (req, res) => {
    Messages.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createMessages: (req, res) => {
    Messages.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Messages created successfully', messagesID: req.body.messagesID });
    });
  },

  getMessagesById: (req, res) => {
    Messages.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Messages:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Messages not found' });
      }
      res.json(result);
    });
  },

  updateMessages: (req, res) => {
    Messages.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Messages:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Messages updated successfully' });
    });
  },

  deleteMessages: (req, res) => {
    Messages.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Messages:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Messages deleted successfully' });
    });
  },

};
