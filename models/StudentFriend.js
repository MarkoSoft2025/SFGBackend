const db = require('../config');

module.exports = {

  create: (data, callback) => {
    const query = 'INSERT INTO studentfriend SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM studentfriend';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM studentfriend WHERE studentfriendID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE studentfriend SET ? WHERE studentfriendID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM studentfriend WHERE studentfriendID = ?';
    db.query(query, [id], callback);
  },

};