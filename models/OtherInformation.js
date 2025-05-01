const db = require('../config');

module.exports = {

  create: (data, callback) => {
    const query = 'INSERT INTO otherInformation SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM otherInformation';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM otherInformation WHERE studentID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE otherInformation SET ? WHERE otherInformationID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM otherInformation WHERE otherInformationID = ?';
    db.query(query, [id], callback);
  },

};