const db = require('../config');

module.exports = {

  getAuth: (username, password, callback) => {
    const query = 'SELECT * FROM student WHERE username = ? AND password = ?';
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

  // create: (data, callback) => {
  //   const query = 'INSERT INTO student SET ?';
  //   db.query(query, data, callback);
  // },

  create: (data, callback) => {
    const query = 'INSERT INTO student SET ?';

    db.beginTransaction((err) => {
        if (err) return callback(err, null);

        db.query(query, data, (err, result) => {
            if (err) {
                return db.rollback(() => callback(err, null));
            }

            const studentID = result.insertId; // Get the auto-incremented studentID

            const familyData = { studentID, ...data.familyBackground };
            db.query('INSERT INTO familyBackground SET ?', familyData, (err) => {
                if (err) {
                    return db.rollback(() => callback(err, null));
                }

                const otherInfoData = { studentID, ...data.otherInformation };
                db.query('INSERT INTO otherInformation SET ?', otherInfoData, (err) => {
                    if (err) {
                        return db.rollback(() => callback(err, null));
                    }

                    const credentials = { studentID, ...data.credentials };
                    db.query('INSERT INTO credentials SET ?', credentials, (err) => {
                        if (err) {
                            return db.rollback(() => callback(err, null));
                        }

                        const averageGrade = { studentID, ...data.averageGrade };
                        db.query('INSERT INTO averageGrade SET ?', averageGrade, (err) => {
                            if (err) {
                                return db.rollback(() => callback(err, null));
                            }

                            // Commit the transaction if all inserts succeed
                            db.commit((err) => {
                                if (err) {
                                    return db.rollback(() => callback(err, null));
                                }
                                callback(null, result);
                            });
                        });
                    });
                });
            });
        });
    });
},






  getAll: (callback) => {
    const query = 'SELECT * FROM student';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM student WHERE studentID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE student SET ? WHERE studentID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM student WHERE studentID = ?';
    db.query(query, [id], callback);
  },
};



