const db = require('../config');

module.exports = {
  create: (data, callback) => {
    const query = 'INSERT INTO facultyProfile SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM facultyProfile';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM facultyProfile WHERE employeeid = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE facultyProfile SET ? WHERE employeeid = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM facultyProfile WHERE facultyProfileID = ?';
    db.query(query, [id], callback);
  },
};



