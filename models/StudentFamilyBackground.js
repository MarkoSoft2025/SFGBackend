const db = require('../config');

module.exports = {

  create: (data, callback) => {
    const query = 'INSERT INTO familyBackground SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM familyBackground';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM familyBackground WHERE studentID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE familyBackground SET ? WHERE familyBackgroundID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM familyBackground WHERE familyBackgroundID = ?';
    db.query(query, [id], callback);
  },

};



