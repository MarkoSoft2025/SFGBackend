const Employee = require('../models/Employee');

module.exports = {

  login: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    Employee.getAuth(username, password, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error.' });
      }

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      res.status(200).json({
        message: 'Login successful!',
        user: {
          id: user.userid,
          empid: user.employeeid,
          username: user.username,
          fullName: user.firstname + " " + user.lastname,
          position: user.position,
          homeCollege: user.homeCollege,
          homeDepartment: user.homeDepartment,
        },
      });
    });
  },
  
  createEmployee: (req, res) => {
    Employee.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating employee:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Employee created successfully', employeeId: req.body.employeeid });
    });
  },

  getAllEmployees: (req, res) => {
    Employee.getAll((err, results) => {
      if (err) {
        console.error('Error fetching employees:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },

  getEmployeeById: (req, res) => {
    Employee.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching employee:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Employee not found1' });
      }
      res.json(result);
    });
  },

  updateEmployee: (req, res) => {
    Employee.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating employee:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Employee updated successfully' });
    });
  },

  deleteEmployee: (req, res) => {
    Employee.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting employee:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Employee deleted successfully' });
    });
  },
};
