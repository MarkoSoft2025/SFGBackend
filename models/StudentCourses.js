const db = require('../config');

module.exports = {

  create: (data, callback) => {
    if (data.choiceNumber === 1) {
        data.status = "For Transfer";
    }
    const query = 'INSERT INTO studentCourses SET ?';
    db.query(query, data, callback);
},

  getJoinCourse: (id, callback) => {
    const query = `
        SELECT studentCourses.*, courses.*
        FROM studentCourses
        INNER JOIN courses ON studentCourses.coursesID = courses.coursesID
        WHERE studentCourses.studentID = ?
        ORDER BY studentCourses.choiceNumber;
    `;
    db.query(query, [id], callback);
},

getJoinStudents: (id, courseName, schoolyear, semester, callback) => {
  const query = `
                SELECT 
                CONCAT(employee.lastName, ', ', employee.firstName, ' ', employee.middleName) AS employee_full_name, 
                courses.coursesID, 
                courses.courseName,
                courses.college,
                courses.department, 
                courses.slot,
                studentCourses.StudentCoursesID,
                studentCourses.status,
                studentCourses.choiceNumber, 
                studentCourses.schoolyear,
                studentCourses.semester,
                student.studentID,
                averageGrade.G11GenAve,
                averageGrade.G12GenAve,
                CONCAT(student.lastName, ', ', student.firstName, ' ', student.middleName) AS student_full_name
            FROM employee
            INNER JOIN courses ON employee.employeeID = courses.departmentChairID
            INNER JOIN studentCourses ON courses.coursesID = studentCourses.coursesID
            INNER JOIN student ON studentCourses.studentID = student.studentID
            LEFT JOIN averageGrade ON student.studentID = averageGrade.studentID
            WHERE employee.employeeID = ? 
              AND courses.department = ?
              AND studentCourses.status = 'PENDING'
              AND studentCourses.schoolyear = ?
              AND studentCourses.semester = ?
            ORDER BY student.lastName;
  `;

  // Ensure both parameters (id and courseName) are passed to the query
  db.query(query, [id, courseName, schoolyear, semester,], callback);
},


// getSearchForTransferStudents: (schoolyear, semester, college, department, page, callback) => {
//   const limit = 10;
//   const offset = (page - 1) * limit;

//   // Query to fetch paginated results
//   // const query = `
//   //           SELECT 
//   //               CONCAT(employee.lastName, ', ', employee.firstName, ' ', employee.middleName) AS Department_Chair, 
//   //               courses.coursesID, 
//   //               courses.courseName,
//   //               courses.college,
//   //               courses.department, 
//   //               courses.slot,
//   //               studentCourses.StudentCoursesID,
//   //               studentCourses.status,
//   //               studentCourses.choiceNumber, 
//   //               studentCourses.schoolyear,
//   //               studentCourses.semester,
//   //               student.studentID,
//   //               averageGrade.G11GenAve,
//   //               averageGrade.G12GenAve,
//   //               CONCAT(student.lastName, ', ', student.firstName, ' ', student.middleName) AS student_full_name
//   //           FROM employee
//   //           RIGHT JOIN courses ON employee.employeeID = courses.departmentChairID
//   //           INNER JOIN studentCourses ON courses.coursesID = studentCourses.coursesID
//   //           INNER JOIN student ON studentCourses.studentID = student.studentID
//   //           LEFT JOIN averageGrade ON student.studentID = averageGrade.studentID
//   //           WHERE studentCourses.status = 'For Transfer'
//   //             AND studentCourses.schoolyear = ?
//   //             AND studentCourses.semester = ?
//   //             AND (
//   //                   studentCourses.coursesID = 0
//   //                 OR (
//   //                   (? IS NULL OR courses.college = ?) 
//   //                   AND (? IS NULL OR courses.department = ?)
//   //                 )
//   //             )
//   //           ORDER BY student.lastName
//   //           LIMIT ? OFFSET ?;
//   // `;

// const query = `
// SELECT 
//     CONCAT(employee.lastName, ', ', employee.firstName, ' ', employee.middleName) AS Department_Chair, 
//     courses.coursesID, 
//     courses.courseName,
//     courses.college,
//     courses.department, 
//     courses.slot,
//     studentCourses.StudentCoursesID,
//     studentCourses.status,
//     studentCourses.choiceNumber, 
//     studentCourses.schoolyear,
//     studentCourses.semester,
//     student.studentID,
//     averageGrade.G11GenAve,
//     averageGrade.G12GenAve,
//     CONCAT(student.lastName, ', ', student.firstName, ' ', student.middleName) AS student_full_name
// FROM studentCourses
// LEFT JOIN courses ON studentCourses.coursesID = courses.coursesID
// LEFT JOIN employee ON employee.employeeID = courses.departmentChairID
// INNER JOIN student ON studentCourses.studentID = student.studentID
// LEFT JOIN averageGrade ON student.studentID = averageGrade.studentID
// WHERE studentCourses.status = 'For Transfer'
//   AND studentCourses.status != 'REJECTED'
//   AND studentCourses.schoolyear = ?
//   AND studentCourses.semester = ?
//   AND (
//         studentCourses.coursesID = 0
//         OR (
//             (? IS NULL OR courses.college = ?) 
//             AND (? IS NULL OR courses.department = ?)
//         )
//   )
// ORDER BY student.lastName
// LIMIT ? OFFSET ?;
// `;

//   // Query to count total records (without pagination)
//   const countQuery = `
//             SELECT COUNT(*) AS totalCount
//             FROM studentCourses
//             INNER JOIN courses ON studentCourses.coursesID = courses.coursesID
//             WHERE studentCourses.status = 'For Transfer'
//               AND studentCourses.schoolyear = ?
//               AND studentCourses.semester = ?
//               AND (
//                   studentCourses.studentID IN (
//                     SELECT studentID FROM student WHERE student.coursesID = 0
//                   ) 
//                   OR (
//                     (? IS NULL OR courses.college = ?) 
//                     AND (? IS NULL OR courses.department = ?)
//                   )
//               );
//   `;

//   // Execute count query first
//   db.query(countQuery, [schoolyear, semester, college, college, department, department], (err, countResult) => {
//     if (err) {
//       return callback(err, null);
//     }

//     const totalCount = countResult[0]?.totalCount || 0; // Get total count from result

//     // Now execute the paginated query
//     db.query(query, [schoolyear, semester, college, college, department, department, limit, offset], (err, data) => {
//       if (err) {
//         return callback(err, null);
//       }

//       callback(null, { students: data, totalCount });
//     });
//   });
// },



getSearchForTransferStudents: (schoolyear, semester, college, department, page, callback) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  const query = `
    SELECT 
        CONCAT(employee.lastName, ', ', employee.firstName, ' ', employee.middleName) AS Department_Chair, 
        courses.coursesID, 
        courses.courseName,
        courses.college,
        courses.department, 
        CAST(courses.slot AS UNSIGNED) AS slotCount,  -- Ensure slotCount is a number
        studentCourses.StudentCoursesID,
        studentCourses.status,
        studentCourses.choiceNumber, 
        studentCourses.schoolyear,
        studentCourses.semester,
        student.studentID,
        averageGrade.G11GenAve,
        averageGrade.G12GenAve,
        CONCAT(student.lastName, ', ', student.firstName, ' ', student.middleName) AS student_full_name
    FROM studentCourses
    LEFT JOIN courses ON studentCourses.coursesID = courses.coursesID
    LEFT JOIN employee ON employee.employeeID = courses.departmentChairID
    INNER JOIN student ON studentCourses.studentID = student.studentID
    LEFT JOIN averageGrade ON student.studentID = averageGrade.studentID
    WHERE studentCourses.status = 'For Transfer'
      AND studentCourses.choiceNumber != 'REJECTED'
      AND studentCourses.schoolyear = ?
      AND studentCourses.semester = ?
      AND (
            studentCourses.coursesID = 0
            OR (
                (? IS NULL OR courses.college = ?) 
                AND (? IS NULL OR courses.courseName = ?)
            )
      )
    ORDER BY student.lastName
    LIMIT ? OFFSET ?;
  `;

  // Query to count total records, statuses, and retrieve slot count
  const countQuery = `
    SELECT 
  CAST(SUM(CASE WHEN studentCourses.status = 'For Transfer' THEN 1 ELSE 0 END) AS UNSIGNED) AS totalCount,  -- Count only 'For Transfer'
  CAST(SUM(CASE WHEN studentCourses.status = 'REJECTED' THEN 1 ELSE 0 END) AS UNSIGNED) AS rejectedCount,
  CAST(SUM(CASE WHEN studentCourses.status = 'APPROVED' THEN 1 ELSE 0 END) AS UNSIGNED) AS approvedCount,
  CAST(SUM(CASE WHEN studentCourses.status = 'PENDING' THEN 1 ELSE 0 END) AS UNSIGNED) AS pendingCount,
  MAX(CAST(courses.slot AS UNSIGNED)) AS slotCount  -- Ensure slotCount is a number
FROM studentCourses
INNER JOIN courses ON studentCourses.coursesID = courses.coursesID
WHERE studentCourses.schoolyear = ?
  AND studentCourses.semester = ?
  AND (
      studentCourses.studentID IN (
        SELECT studentID FROM student WHERE student.coursesID = 0
      ) 
      OR (
        (? IS NULL OR courses.college = ?) 
        AND (? IS NULL OR courses.department = ?)
      )
  );

  `;

  // Execute count query first
  db.query(countQuery, [schoolyear, semester, college, college, department, department], (err, countResult) => {
    if (err) {
      return callback(err, null);
    }

    // Ensure all counts return as whole numbers
    const totalCount = countResult.reduce((sum, row) => sum + Number(row.totalCount || 0), 0);
    const rejectedCount = countResult.reduce((sum, row) => sum + Number(row.rejectedCount || 0), 0);
    const approvedCount = countResult.reduce((sum, row) => sum + Number(row.approvedCount || 0), 0);
    const pendingCount = countResult.reduce((sum, row) => sum + Number(row.pendingCount || 0), 0);
    const slotCount = countResult.reduce((sum, row) => sum + Number(row.slotCount || 0), 0);

    // Now execute the paginated query
    db.query(query, [schoolyear, semester, college, college, department, department, limit, offset], (err, data) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, { students: data, totalCount, rejectedCount, approvedCount, pendingCount, slotCount });
    });
  });
},





getAllCourseStudents: ( schoolyear, semester, callback) => {
  const query = `
    SELECT 
    courses.courseName,
    courses.college,
    courses.department, 
    courses.slot,
    
    -- Department Chair
    CONCAT(employee.lastName, ', ', employee.firstName, ' ', employee.middleName) AS Department_Chair, 

    -- Counting occurrences of each status
    COUNT(CASE WHEN studentCourses.status = 'REJECTED' THEN 1 END) AS rejected_count,
    COUNT(CASE WHEN studentCourses.status = 'PENDING' THEN 1 END) AS pending_count,
    COUNT(CASE WHEN studentCourses.status = 'APPROVED' THEN 1 END) AS approved_count,
    COUNT(CASE WHEN studentCourses.status = 'For Transfer' THEN 1 END) AS for_transfer_count,

    -- Total number of students for the course
    COUNT(studentCourses.StudentCoursesID) AS total_students,

    -- Remaining slots (total slots - approved students)
    (courses.slot - COUNT(CASE WHEN studentCourses.status = 'APPROVED' THEN 1 END)) AS remaining_slot

FROM employee
RIGHT JOIN courses ON employee.employeeID = courses.departmentChairID
INNER JOIN studentCourses ON courses.coursesID = studentCourses.coursesID
INNER JOIN student ON studentCourses.studentID = student.studentID
LEFT JOIN averageGrade ON student.studentID = averageGrade.studentID

WHERE studentCourses.schoolyear = ?
  AND studentCourses.semester = ?

GROUP BY 
    courses.courseName,
    courses.college,
    courses.department, 
    courses.slot,
    Department_Chair

ORDER BY courses.courseName;
  `;

  // Ensure both parameters (id and courseName) are passed to the query
  db.query(query, [schoolyear, semester,], callback);
},



getByCourseName: (schoolyear, semester, courseName, callback) => {
  const query = `
    SELECT 
    courses.coursesID,
    courses.courseName,
    courses.college,
    courses.department, 
    courses.slot,

    -- Department Chair (Using full column names instead of alias)
    CONCAT(employee.lastName, ', ', employee.firstName, ' ', COALESCE(employee.middleName, '')) AS Department_Chair, 

    -- Counting occurrences of each status
    COUNT(CASE WHEN studentCourses.status = 'REJECTED' THEN 1 END) AS rejected_count,
    COUNT(CASE WHEN studentCourses.status = 'PENDING' THEN 1 END) AS pending_count,
    COUNT(CASE WHEN studentCourses.status = 'APPROVED' THEN 1 END) AS approved_count,
    COUNT(CASE WHEN studentCourses.status = 'For Transfer' THEN 1 END) AS for_transfer_count,

    -- Total number of students for the course
    COUNT(studentCourses.StudentCoursesID) AS total_students,

    -- Remaining slots (total slots - approved students)
    (courses.slot - COUNT(CASE WHEN studentCourses.status = 'APPROVED' THEN 1 END)) AS remaining_slot

FROM courses
LEFT JOIN employee ON employee.employeeID = courses.departmentChairID
INNER JOIN studentCourses ON courses.coursesID = studentCourses.coursesID
INNER JOIN student ON studentCourses.studentID = student.studentID
LEFT JOIN averageGrade ON student.studentID = averageGrade.studentID

WHERE studentCourses.schoolyear = ? 
  AND studentCourses.semester = ?
  AND courses.courseName = ?

GROUP BY 
    courses.coursesID,
    courses.courseName,
    courses.college,
    courses.department, 
    courses.slot,
    employee.lastName,
    employee.firstName,
    employee.middleName

ORDER BY courses.courseName;
  `;

  // Ensure all three parameters are passed: schoolyear, semester, and courseName
  db.query(query, [schoolyear, semester, courseName], callback);
},


getStatusStudents: (status, courseName, schoolyear, semester, callback) => {
  const query = `
                SELECT 
                CONCAT(employee.lastName, ', ', employee.firstName, ' ', employee.middleName) AS employee_full_name, 
                courses.coursesID, 
                courses.courseName,
                courses.college,
                courses.department, 
                courses.slot,
                studentCourses.StudentCoursesID,
                studentCourses.status,
                studentCourses.remarks,
                studentCourses.choiceNumber, 
                studentCourses.schoolyear,
                studentCourses.semester,
                student.studentID,
                averageGrade.G11GenAve,
                averageGrade.G12GenAve,
                CONCAT(student.lastName, ', ', student.firstName, ' ', student.middleName) AS student_full_name
            FROM employee
            INNER JOIN courses ON employee.employeeID = courses.departmentChairID
            INNER JOIN studentCourses ON courses.coursesID = studentCourses.coursesID
            INNER JOIN student ON studentCourses.studentID = student.studentID
            LEFT JOIN averageGrade ON student.studentID = averageGrade.studentID
            WHERE studentCourses.status = ?
              AND courses.courseName = ?
              AND studentCourses.schoolyear = ?
              AND studentCourses.semester = ?
            ORDER BY student.lastName;
  `;

  // Ensure both parameters (id and courseName) are passed to the query
  db.query(query, [status, courseName, schoolyear, semester,], callback);
},



getJoinAllStudents: ( schoolyear, semester, callback) => {
  const query = `
                SELECT 
                CONCAT(employee.lastName, ', ', employee.firstName, ' ', employee.middleName) AS employee_full_name, 
                courses.coursesID, 
                courses.courseName,
                courses.college,
                courses.department, 
                courses.slot,
                studentCourses.StudentCoursesID,
                studentCourses.status,
                studentCourses.choiceNumber, 
                studentCourses.schoolyear,
                studentCourses.semester,
                student.studentID,
                averageGrade.G11GenAve,
                averageGrade.G12GenAve,
                CONCAT(student.lastName, ', ', student.firstName, ' ', student.middleName) AS student_full_name
            FROM employee
            INNER JOIN courses ON employee.employeeID = courses.departmentChairID
            INNER JOIN studentCourses ON courses.coursesID = studentCourses.coursesID
            INNER JOIN student ON studentCourses.studentID = student.studentID
            LEFT JOIN averageGrade ON student.studentID = averageGrade.studentID
            WHERE employee.employeeID = ? 
              AND studentCourses.status = 'For Transfer'
              AND studentCourses.schoolyear = ?
              AND studentCourses.semester = ?
            ORDER BY student.lastName;
  `;

  // Ensure both parameters (id and courseName) are passed to the query
  db.query(query, [id, courseName, schoolyear, semester,], callback);
},

  getAll: (callback) => {
    const query = 'SELECT * FROM studentCourses';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM studentCourses WHERE studentID = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },


// update: (id, data, callback) => {
//   if (data.status === "REJECTED") {
//       const selectQuery = 'SELECT studentID, choiceNumber AS choiceSelected FROM studentCourses WHERE StudentCoursesID = ?';

//       db.query(selectQuery, [id], (err, results) => {
//           if (err) return callback(err);
//           if (results.length === 0) return callback(new Error('No record found for the given ID'));

//           const { studentID, choiceSelected } = results[0];
//           const nextChoice = parseInt(choiceSelected, 10) + 1;

//           const updateQuery = 'UPDATE studentCourses SET ? WHERE StudentCoursesID = ?';
//           db.query(updateQuery, [data, id], (err, updateResults) => {
//               if (err) return callback(err);

//               let statusUpdateQuery;
//               let queryParams;

//               if (nextChoice > 5) {
//                   statusUpdateQuery = `
//                       UPDATE studentCourses 
//                       SET status = 'REJECTED' 
//                       WHERE studentID = ? AND choiceNumber = 5`;
//                   queryParams = [studentID];

//                   data.choiceNumber = "6";
//                   data.status = "For Transfer";
//                   data.coursesID = "0";
//                   const query = 'INSERT INTO studentCourses SET ?';
//                   db.query(query, data, callback);
//               } else {
//                   statusUpdateQuery = `
//                       UPDATE studentCourses 
//                       SET status = 'For Transfer' 
//                       WHERE studentID = ? AND choiceNumber = ?`;
//                   queryParams = [studentID, nextChoice];
//               }

//               db.query(statusUpdateQuery, queryParams, (err, statusUpdateResults) => {
//                   if (err) return callback(err);
//                   callback(null, { updateResults, statusUpdateResults });
//               });
//           });
//       });
//   } else {
//       const query = 'UPDATE studentCourses SET ? WHERE StudentCoursesID = ?';
//       db.query(query, [data, id], callback);
//   }
// },

update: (id, data, callback) => {
  if (data.status !== "REJECTED") {
      // Directly update if status is not "REJECTED"
      return db.query('UPDATE studentCourses SET ? WHERE StudentCoursesID = ?', [data, id], callback);
  }

  // Fetch student details and choice number
  const selectQuery = `
      SELECT studentID, choiceNumber AS choiceSelected 
      FROM studentCourses 
      WHERE StudentCoursesID = ?`;

  db.query(selectQuery, [id], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(new Error('No record found for the given ID'));

      const { studentID, choiceSelected } = results[0];
      const nextChoice = parseInt(choiceSelected, 10) + 1;

      // Update the current record
      const updateQuery = 'UPDATE studentCourses SET ? WHERE StudentCoursesID = ?';
      db.query(updateQuery, [data, id], (err, updateResults) => {
          if (err) return callback(err);

          if (nextChoice > 5) {
              // First, fetch schoolyear and semester from choiceNumber 5
              const schoolYearQuery = `
                  SELECT schoolyear, semester 
                  FROM studentCourses 
                  WHERE studentID = ? AND choiceNumber = 5`;

              db.query(schoolYearQuery, [studentID], (err, schoolYearResults) => {
                  if (err) return callback(err);
                  if (schoolYearResults.length === 0) return callback(new Error('No schoolyear/semester found for choice 5'));

                  const { schoolyear, semester } = schoolYearResults[0];

                  // Mark choice 5 as "REJECTED"
                  const statusUpdateQuery = `
                      UPDATE studentCourses 
                      SET status = 'REJECTED' 
                      WHERE studentID = ? AND choiceNumber = 5`;

                  db.query(statusUpdateQuery, [studentID], (err) => {
                      if (err) return callback(err);

                      // Now insert new row with fetched schoolyear & semester
                      const newEntry = {
                          studentID,
                          choiceNumber: "6",
                          status: "For Transfer",
                          coursesID: "0",
                          schoolyear,  // Using the fetched values
                          semester
                      };

                      console.log("Inserting new entry:", newEntry); // Debugging log

                      db.query('INSERT INTO studentCourses SET ?', newEntry, (err, insertResults) => {
                          if (err) return callback(err);
                          callback(null, { updateResults, insertResults });
                      });
                  });
              });
          } else {
              // Update next choice to "For Transfer"
              const statusUpdateQuery = `
                  UPDATE studentCourses 
                  SET status = 'For Transfer' 
                  WHERE studentID = ? AND choiceNumber = ?`;

              db.query(statusUpdateQuery, [studentID, nextChoice], (err, statusUpdateResults) => {
                  if (err) return callback(err);
                  callback(null, { updateResults, statusUpdateResults });
              });
          }
      });
  });
},




  delete: (id, callback) => {
    const query = 'DELETE FROM studentCourses WHERE StudentCoursesID = ?';
    db.query(query, [id], callback);
  },

};



