// const crypto = require("crypto");
// const User = require("../models/User");
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "uepverifier@gmail.com",  // Use your verified Gmail address here
//     pass: "pujc lbdz irpd sqvb",    // Use the generated app password here
//   },
// });

// // Register & Send Verification Email
// exports.register = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const debug = { step: "start", email };

//     // Check for existing user
//     const existingUser = await User.findUserByEmail(email);
//     debug.step = "checked existing user";
//     debug.existingUser = existingUser;

//     // Generate token
//     const token = crypto.randomBytes(32).toString("hex");
//     debug.token = token;

//     if (!existingUser) {
//       debug.step = "creating new user";
//       await User.createUser(email, token);
//     } else if (!existingUser.emailVerified) {
//       debug.step = "updating token for unverified user";
//       await User.updateVerificationToken(email, token);
//     } else {
//       debug.step = "user already verified";
//     }

//     // Prepare and send email
//     const verificationUrl = `https://uepadmission.vercel.app/verify?token=${token}`;
//     debug.verificationUrl = verificationUrl;

//     await transporter.sendMail({
//       from: "uepverifier@gmail.com",
//       to: email,
//       subject: "Verify Your Email",
//       html: `<p>Click the link below to verify your email:</p><a href="${verificationUrl}">Verify Email</a>`,
//     });

//     debug.step = "email sent";

//     res.json({
//       message: "Verification email sent. Check your inbox.",
//       debug, // send debug info to Postman
//     });

//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({
//       error: "Internal Server Error",
//       debug: {
//         message: error.message,
//         stack: error.stack,
//       }
//     });
//   }
// };



// // Verify Email via Token
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.query;  // Get token from query parameter
//     const user = await User.findUserByToken(token);

//     if (!user) {
//       return res.status(400).json({ error: "Invalid or expired verification token." });
//     }

//     await User.verifyUserEmail(user.email);

//     res.json({ message: "Email verified successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Check Email Verification Status
// exports.checkVerification = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findUserByEmail(email);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({ emailVerified: user.emailVerified });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };




const crypto = require("crypto");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "uepverifier@gmail.com",  // Use your verified Gmail address here
    pass: "pujc lbdz irpd sqvb",    // Use the generated app password here
  },
});

// Register & Send Verification Email
exports.register = async (req, res) => {
  try {
    const { email } = req.body;
    const debug = { step: "start", email };

    // Check for existing user
    const existingUser = await User.findUserByEmail(email);
    debug.step = "checked existing user";
    debug.existingUser = existingUser;

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    debug.token = token;

    // Save to the database
    if (!existingUser) {
      debug.step = "creating new user";
      const createUserResult = await User.createUser(email, token);
      debug.createUserResult = createUserResult;
    } else if (!existingUser.emailVerified) {
      debug.step = "updating token for unverified user";
      const updateResult = await User.updateVerificationToken(email, token);
      debug.updateResult = updateResult;
    } else {
      debug.step = "user already verified";
    }

    // Now send email only after the database operation is successful
    const verificationUrl = `https://uepadmission.vercel.app/verify?token=${token}`;
    debug.verificationUrl = verificationUrl;

    // Send email
    try {
      await transporter.sendMail({
        from: "uepverifier@gmail.com",
        to: email,
        subject: "Verify Your Email",
        html: `<p>Click the link below to verify your email:</p><a href="${verificationUrl}">Verify Email</a>`,
      });
      debug.step = "email sent";
      console.log("Email sent successfully to:", email);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        error: "Email sending failed.",
        debug,
      });
    }

    // Respond back if everything is successful
    res.json({
      message: "Verification email sent. Check your inbox.",
      debug, // send debug info to Postman
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      debug: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
};

// Verify Email via Token
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findUserByToken(token);

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired verification token." });
    }

    await User.verifyUserEmail(user.email);

    res.json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Check Email Verification Status
exports.checkVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ emailVerified: user.emailVerified });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
