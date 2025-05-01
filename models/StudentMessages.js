const db = require('../config');

module.exports = {

  create: (data, callback) => {
    const query = 'INSERT INTO messages SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM messages';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM messages WHERE messagesID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE messages SET ? WHERE messagesID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM messages WHERE messagesID = ?';
    db.query(query, [id], callback);
  },

};