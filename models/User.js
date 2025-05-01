const db = require('../config');

// Create User with Verification Token
// exports.createUser = async (email, token) => {
//   try {
//     console.log("Creating user:", email);
//     const result = await db.execute(
//       "INSERT INTO users (email, emailVerified, verificationToken) VALUES (?, ?, ?)",
//       [email, false, token]
//     );

//     console.log("DB result for createUser:", result);

//     // Access insertId from the result object
//     const insertId = result[0]?.insertId;
//     if (!insertId) {
//       throw new Error("Insert ID not returned, unable to create user.");
//     }

//     console.log("User created, insert ID:", insertId);
//     return { insertId };
//   } catch (err) {
//     console.error("Error in createUser:", err);
//     throw err;
//   }
// };


// Create User with Verification Token
exports.createUser = async (email, token) => {
  try {
    console.log("Creating user:", email);
    const query = "INSERT INTO users (email, emailVerified, verificationToken) VALUES (?, ?, ?)";
    
    // Await the result of the database insertion
    const [result] = await db.execute(query, [email, false, token]);
    console.log("User created, result:", result);

    // Check if insertId exists
    if (result && result.insertId) {
      console.log("User created, insert ID:", result.insertId);
      return result;
    } else {
      throw new Error("Insert ID not returned, unable to create user.");
    }
  } catch (err) {
    console.error("Error in createUser:", err);
    throw err;
  }
};




// Find User by Email
exports.findUserByEmail = async (email) => {
  try {
    const result = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    console.log("DB result for findUserByEmail:", result);

    const rows = Array.isArray(result) ? result[0] : result;
    return rows && rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error("Error in findUserByEmail:", err);
    throw err;
  }
};


// Find User by Verification Token
exports.findUserByToken = async (token) => {
  try {
    const result = await db.execute("SELECT * FROM users WHERE verificationToken = ?", [token]);
    const rows = result[0];
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error("Error in findUserByToken:", err);
    throw err;
  }
};

// Verify User's Email
exports.verifyUserEmail = async (email) => {
  try {
    const result = await db.execute(
      "UPDATE users SET emailVerified = ?, verificationToken = NULL WHERE email = ?",
      [true, email]
    );
    return result[0];
  } catch (err) {
    console.error("Error in verifyUserEmail:", err);
    throw err;
  }
};

// Update Verification Token
exports.updateVerificationToken = async (email, token) => {
  try {
    const result = await db.execute(
      "UPDATE users SET verificationToken = ? WHERE email = ?",
      [token, email]
    );
    return result[0];
  } catch (err) {
    console.error("Error in updateVerificationToken:", err);
    throw err;
  }
};
