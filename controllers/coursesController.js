const Courses = require('../models/Courses');

module.exports = {

  getAllCourses: (req, res) => {
    Courses.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createCourses: (req, res) => {
    Courses.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Courses created successfully', coursesID: req.body.coursesID });
    });
  },

  getByDepartment: (req, res) => {
    Courses.getByDepartment(req.params.department, (err, result) => {
      if (err) {
        console.error('Error fetching Courses:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Courses not found' });
      }
      res.json(result);
    });
  },

  getCoursesById: (req, res) => {
    Courses.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Courses:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Courses not found' });
      }
      res.json(result);
    });
  },

  updateCourses: (req, res) => {
    Courses.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Courses:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Courses updated successfully' });
    });
  },

  deleteCourses: (req, res) => {
    Courses.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Courses:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Courses deleted successfully' });
    });
  },

};
