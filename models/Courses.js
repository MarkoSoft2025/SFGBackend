const db = require('../config');

module.exports = {

  create: (data, callback) => {
    const query = 'INSERT INTO courses SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM courses';
    db.query(query, callback);
  },

  getByDepartment: (department, callback) => {
    const query = 'SELECT courseName FROM courses WHERE department = ?';
    db.query(query, [department], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM courses WHERE coursesID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },


  update: (id, data, callback) => {
    const query = 'UPDATE courses SET ? WHERE coursesID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM courses WHERE coursesID = ?';
    db.query(query, [id], callback);
  },

};
