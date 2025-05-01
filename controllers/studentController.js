const Student = require('../models/Students');

module.exports = {

  login: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    Student.getAuth(username, password, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error.' });
      }

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      res.status(200).json({
        message: 'Login successful!',
        user: {
          id: user.studentID,
          studno: user.studentNumber,
          username: user.username,
          fullName: user.firstName + " " + user.lastName,
          track: user.track,
          studentSignup: user.studentSignup,
        },
      });
    });
  },
  
  createStudent: (req, res) => {
    Student.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Student:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Student created successfully', studentID: req.body.studentID });
    });
  },

  getAllStudents: (req, res) => {
    Student.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Students:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getStudentById: (req, res) => {
    Student.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Student:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Student not found1' });
      }
      res.json(result);
    });
  },

  updateStudent: (req, res) => {
    Student.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Student:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Student updated successfully' });
    });
  },

  deleteStudent: (req, res) => {
    Student.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Student:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Student deleted successfully' });
    });
  },
};
