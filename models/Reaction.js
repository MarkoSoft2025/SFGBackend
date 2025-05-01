const db = require('../config');

module.exports = {

  create: (data, callback) => {
    const checkQuery = `
        SELECT * FROM reaction WHERE announcementID = ? AND empstudID = ?;
    `;
    db.query(checkQuery, [data.announcementID, data.empstudID], (err, results) => {
        if (err) return callback(err);
        
        if (results.length > 0) {
            // If reaction exists, delete it (toggle off)
            const deleteQuery = `
                DELETE FROM reaction WHERE announcementID = ? AND empstudID = ?;
            `;
            return db.query(deleteQuery, [data.announcementID, data.empstudID], callback);
        }

        // If no reaction exists, insert it (toggle on)
        const insertQuery = 'INSERT INTO reaction SET ?';
        db.query(insertQuery, data, callback);
    });
},


  getAll: (callback) => {
    const query = 'SELECT * FROM reaction';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM reaction WHERE reactionID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE reaction SET ? WHERE reactionID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM reaction WHERE reactionID = ?';
    db.query(query, [id], callback);
  },

};