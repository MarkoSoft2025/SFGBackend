const db = require('../config');

module.exports = {
  create: (data, callback) => {
    const query = 'INSERT INTO workexperience SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM workexperience';
    db.query(query, callback);
  },

  getAllByEmpId: (empid, callback) => {
    const query = 'SELECT * FROM workexperience WHERE employeeid = ?';
    db.query(query, [empid], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM workexperience WHERE workexperienceid = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE workexperience SET ? WHERE workexperienceid = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM workexperience WHERE workexperienceid = ?';
    db.query(query, [id], callback);
  },
};



