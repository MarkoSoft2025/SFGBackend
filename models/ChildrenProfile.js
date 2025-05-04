const db = require('../config');

module.exports = {
  create: (data, callback) => {
    const query = 'INSERT INTO tbl_childrenprofile SET ?';
    db.query(query, data, callback);
  },

  getAllByEmpId: (empid, callback) => {
    const query = 'SELECT * FROM tbl_childrenprofile WHERE employeeid = ?';
    db.query(query, [empid], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM tbl_childrenprofile';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM tbl_childrenprofile WHERE childrenprofile_id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE tbl_childrenprofile SET ? WHERE childrenprofile_id = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM tbl_childrenprofile WHERE childrenprofile_id = ?';
    db.query(query, [id], callback);
  },
};



