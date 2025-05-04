const db = require('../config');

module.exports = {
  create: (data, callback) => {
    const query = 'INSERT INTO eligibility SET ?';
    db.query(query, data, callback);
  },

  getAllByEmpId: (empid, callback) => {
    const query = 'SELECT * FROM eligibility WHERE employeeid = ?';
    db.query(query, [empid], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM eligibility';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM eligibility WHERE eligibilityID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE eligibility SET ? WHERE eligibilityID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM eligibility WHERE eligibilityID = ?';
    db.query(query, [id], callback);
  },
};



