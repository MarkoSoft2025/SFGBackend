const db = require('../config');

module.exports = {
  create: (data, callback) => {
    const query = 'INSERT INTO trainingProgram SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM trainingProgram';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM trainingProgram WHERE trainingProgramID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  getAllByEmpId: (empid, callback) => {
    const query = 'SELECT * FROM trainingProgram WHERE employeeid = ?';
    db.query(query, [empid], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE trainingProgram SET ? WHERE trainingProgramID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM trainingProgram WHERE trainingProgramID = ?';
    db.query(query, [id], callback);
  },
};



