const db = require('../config');

module.exports = {

  getAuth: (username, password, callback) => {
    const query = 'SELECT * FROM tbl_employee WHERE username = ? AND password = ?';
    console.log('Executing query:', query, [username, password]);

    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return callback(err, null);
      }

      console.log('Query results:', results);
      callback(null, results[0]); // Return the first result (if any)
    });
  },

  
  create: (data, callback) => {
    const query = 'INSERT INTO tbl_employee SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM tbl_employee';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM tbl_employee WHERE employeeid = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE tbl_employee SET ? WHERE employeeid = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM tbl_employee WHERE employeeid = ?';
    db.query(query, [id], callback);
  },
};



