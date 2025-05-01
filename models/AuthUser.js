const db = require('../config');

module.exports = {

  create: (data, callback) => {
    const query = 'INSERT INTO users SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM users WHERE userID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  findUserByToken: (token, callback) => {
    const query = 'SELECT * FROM users WHERE verificationToken = ?';
    db.query(query, [token], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(new Error('User not found'), null);
  
      const user = results[0];
  
      // Update emailVerified and clear the token
      const updateQuery = 'UPDATE users SET emailVerified = 1 WHERE userID = ?';
      db.query(updateQuery, [user.userID], (updateErr, updateResult) => {
        if (updateErr) return callback(updateErr, null);
        callback(null, { message: 'Email successfully verified', user });
      });
    });
  },
  


  update: (id, data, callback) => {
    const query = 'UPDATE users SET ? WHERE userID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM users WHERE userID = ?';
    db.query(query, [id], callback);
  },

};