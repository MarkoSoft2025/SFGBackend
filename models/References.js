const db = require('../config');

module.exports = {
  create: (data, callback) => {
    const query = 'INSERT INTO tblreferences SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM tblreferences';
    db.query(query, callback);
  },

  getAllByEmpId: (empid, callback) => {
    const query = 'SELECT * FROM tblreferences WHERE employeeid = ?';
    db.query(query, [empid], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM tblreferences WHERE referencesID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE tblreferences SET ? WHERE referencesID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM tblreferences WHERE referencesID = ?';
    db.query(query, [id], callback);
  },
};



