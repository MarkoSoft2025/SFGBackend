const Comments = require('../models/Comments');

module.exports = {

  getAllComments: (req, res) => {
    Comments.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createComments: (req, res) => {
    Comments.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Comments created successfully', commentsID: req.body.commentsID });
    });
  },

  getCommentsById: (req, res) => {
    Comments.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Comments:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Comments not found' });
      }
      res.json(result);
    });
  },

  updateComments: (req, res) => {
    Comments.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Comments:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Comments updated successfully' });
    });
  },

  deleteComments: (req, res) => {
    Comments.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Comments:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Comments deleted successfully' });
    });
  },

};
