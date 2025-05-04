const db = require('../config');

module.exports = {
  create: (data, callback) => {
    const query = 'INSERT INTO voluntarywork SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM voluntarywork';
    db.query(query, callback);
  },

  getAllByEmpId: (empid, callback) => {
    const query = 'SELECT * FROM voluntarywork WHERE employeeid = ?';
    db.query(query, [empid], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM voluntarywork WHERE voluntaryworkid = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE voluntarywork SET ? WHERE voluntaryworkid = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM voluntarywork WHERE voluntaryworkid = ?';
    db.query(query, [id], callback);
  },
};



