const db = require('../config');

module.exports = {
  create: (data, callback) => {
    const query = 'INSERT INTO educationalBackground SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM educationalBackground';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM educationalBackground WHERE educationalBackgroundID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  getAllByEmpId: (empid, callback) => {
    const query = 'SELECT * FROM educationalBackground WHERE employeeid = ?';
    db.query(query, [empid], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE educationalBackground SET ? WHERE educationalBackgroundID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM educationalBackground WHERE educationalBackgroundID = ?';
    db.query(query, [id], callback);
  },
};



