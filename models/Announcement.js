const db = require('../config');

module.exports = {

  create: (data, callback) => {
    const query = 'INSERT INTO announcement SET ?';
    db.query(query, data, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM announcement';
    db.query(query, callback);
  },

  getAllRecord: (callback) => {
    const query = `
    SELECT 
    a.announcementID,
    a.employeeID,
    a.announcementTitle,
    a.announcement,
    a.file,
    a.announcementDateTime,
    a.announcementFrom,
    a.announcementPin,

    -- Get total distinct reactions
    IFNULL(reaction_data.totalReactions, 0) AS totalReactions,

    -- Nested Reactions (Preventing duplication)
    IFNULL(reaction_data.reactions, JSON_ARRAY()) AS reactions,

    -- Nested Comments
    IFNULL(comment_data.comments, JSON_ARRAY()) AS comments

FROM announcement a

-- Subquery for Reactions
LEFT JOIN (
    SELECT 
      r.announcementID,
      COUNT(DISTINCT r.reactionID) AS totalReactions,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'reactionID', r.reactionID,
              'empstudID', r.empstudID,
              'reactionType', r.reactionType,
              'reactionFrom', r.reactionFrom
          )
      ) AS reactions
    FROM reaction r
    GROUP BY r.announcementID
) AS reaction_data ON a.announcementID = reaction_data.announcementID

-- Subquery for Comments
LEFT JOIN (
    SELECT 
      c.announcementID,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'commentsID', c.commentsID,
              'empstudID', c.empstudID,
              'commentsFrom', c.commentsFrom,
              'comments', c.comments,
              'commentsDateTime', c.commentsDateTime,
              'department', c.department, -- Directly from comments table
              'commenterName', COALESCE(sc.Student_Fullname, ec.Employee_Name),
              'commenterPicture', sc.Student_Picture -- Include student picture
          )
      ) AS comments
    FROM comments c
    LEFT JOIN (
      SELECT 
          c.commentsID, 
          c.announcementID,
          CONCAT(s.lastName, ', ', s.firstName, ' ', s.middleName) AS Student_Fullname,
          s.picture AS Student_Picture -- Include student picture
      FROM comments c
      INNER JOIN student s ON c.empstudID = s.studentID
      WHERE c.commentsFrom = 'Student'
    ) AS sc ON c.commentsID = sc.commentsID
    LEFT JOIN (
      SELECT 
          c.commentsID, 
          c.announcementID,
          CONCAT(e.lastName, ', ', e.firstName, ' ', e.middleName) AS Employee_Name
      FROM comments c
      INNER JOIN employee e ON c.empstudID = e.employeeID
      WHERE c.commentsFrom = 'Employee'
    ) AS ec ON c.commentsID = ec.commentsID
    GROUP BY c.announcementID
) AS comment_data ON a.announcementID = comment_data.announcementID;


    `;
    db.query(query, callback);
},

  getById: (id, callback) => {
    const query = 'SELECT * FROM announcement WHERE announcementID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query = 'UPDATE announcement SET ? WHERE announcementID = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM announcement WHERE announcementID = ?';
    db.query(query, [id], callback);
  },

};