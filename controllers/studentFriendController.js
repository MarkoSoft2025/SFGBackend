const StudentFriend = require('../models/StudentFriend');

module.exports = {

  getAllStudentFriend: (req, res) => {
    StudentFriend.getAll((err, results) => {
      if (err) {
        console.error('Error fetching:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createStudentFriend: (req, res) => {
    StudentFriend.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'StudentFriend created successfully', studentfriendID: req.body.studentfriendID });
    });
  },

  getStudentFriendById: (req, res) => {
    StudentFriend.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching StudentFriend:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'StudentFriend not found' });
      }
      res.json(result);
    });
  },

  updateStudentFriend: (req, res) => {
    StudentFriend.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating StudentFriend:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'StudentFriend updated successfully' });
    });
  },

  deleteStudentFriend: (req, res) => {
    StudentFriend.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting StudentFriend:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'StudentFriend deleted successfully' });
    });
  },

};
