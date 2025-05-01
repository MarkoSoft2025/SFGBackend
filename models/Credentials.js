const db = require('../config');

module.exports = {

  create: (data, callback) => {
    const query = 'INSERT INTO credentials SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM credentials';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM credentials WHERE studentID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE credentials SET ? WHERE credentialsID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM credentials WHERE credentialsID = ?';
    db.query(query, [id], callback);
  },

};
