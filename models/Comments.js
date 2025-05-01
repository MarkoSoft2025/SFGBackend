const db = require('../config');

module.exports = {

  create: (data, callback) => {
    const query = 'INSERT INTO comments SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM comments';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM comments WHERE commentsID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE comments SET ? WHERE commentsID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM comments WHERE commentsID = ?';
    db.query(query, [id], callback);
  },

};