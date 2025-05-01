const Reaction = require('../models/Reaction');

module.exports = {

  getAllReaction: (req, res) => {
    Reaction.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createReaction: (req, res) => {
    Reaction.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Reaction created successfully', reactionID: req.body.reactionID });
    });
  },

  getReactionById: (req, res) => {
    Reaction.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Reaction:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Reaction not found' });
      }
      res.json(result);
    });
  },

  updateReaction: (req, res) => {
    Reaction.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Reaction:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Reaction updated successfully' });
    });
  },

  deleteReaction: (req, res) => {
    Reaction.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Reaction:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Reaction deleted successfully' });
    });
  },

};
