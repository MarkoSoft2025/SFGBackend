const StudentCourses = require('../models/StudentCourses');

module.exports = {

  getAllStudentCourses: (req, res) => {
    StudentCourses.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  createStudentCourses: (req, res) => {
    StudentCourses.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Family Background:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Student Courses created successfully', studentCoursesID: req.body.studentCoursesID });
    });
  },

  getJoinStudents: (req, res) => {
    const { id, courseName, schoolyear, semester } = req.params; // Get parameters from the request
  
    StudentCourses.getJoinStudents(id, courseName, schoolyear, semester, (err, result) => {
      if (err) {
        console.error('Error fetching joined students:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ message: 'No students found for this course.' });
      }
      res.json(result);
    });
  },

  getSearchForTransferStudents: (req, res) => {
    const { schoolyear, semester, college, department, page} = req.params; // Get parameters from the request
  
    StudentCourses.getSearchForTransferStudents(schoolyear, semester, college, department, page, (err, result) => {
      if (err) {
        console.error('Error fetching Search students:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ message: 'No students found for this course.' });
      }
      res.json(result);
    });
  },

  getStatusStudents: (req, res) => {
    const {status, courseName, schoolyear, semester } = req.params; // Get parameters from the request
  
    StudentCourses.getStatusStudents(status, courseName, schoolyear, semester, (err, result) => {
      if (err) {
        console.error('Error fetching joined students:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ message: 'No students found for this course.' });
      }
      res.json(result);
    });
  },

  getJoinAllStudents: (req, res) => {
    const { schoolyear, semester } = req.params; // Get parameters from the request
  
    StudentCourses.getJoinAllStudents(schoolyear, semester, (err, result) => {
      if (err) {
        console.error('Error fetching joined students:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ message: 'No students found for this course.' });
      }
      res.json(result);
    });
  },

  getByCourseName: (req, res) => {
    const { schoolyear, semester, courseName } = req.params; // Get parameters from the request
  
    StudentCourses.getByCourseName(schoolyear, semester, courseName, (err, result) => {
      if (err) {
        console.error('Error fetching joined students:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ message: 'No students found for this courses1.' });
      }
      res.json(result);
    });
  },

  getAllCourseStudents: (req, res) => {
    const { schoolyear, semester } = req.params; // Get parameters from the request
  
    StudentCourses.getAllCourseStudents(schoolyear, semester, (err, result) => {
      if (err) {
        console.error('Error fetching joined students:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ message: 'No students found for this course.' });
      }
      res.json(result);
    });
  },
  

  getStudentCoursesJoin: (req, res) => {
    StudentCourses.getJoinCourse(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Student Courses:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Student Courses not found' });
      }
      res.json(result);
    });
  },

  getStudentCoursesById: (req, res) => {
    StudentCourses.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching Student Courses:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'Student Courses not found' });
      }
      res.json(result);
    });
  },

  updateStudentCourses: (req, res) => {
    StudentCourses.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating Student Courses:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Student Courses updated successfully' });
    });
  },

  deleteStudentCourses: (req, res) => {
    StudentCourses.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting Student Courses:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Student Courses deleted successfully' });
    });
  },

};
