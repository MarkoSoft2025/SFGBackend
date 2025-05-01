const AuthUser = require('../models/AuthUser');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "uepverifier@gmail.com",
    pass: "pujc lbdz irpd sqvb",
  },
  logger: true,
  debug: true,
});

module.exports = {

  getAllAuthUser: (req, res) => {
    AuthUser.getAll((err, results) => {
      if (err) {
        console.error('Error fetching Auth User:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  },


  
  createAuthUser: (req, res) => {
    AuthUser.create(req.body, (err, result) => {
      if (err) {
        console.error('Error creating Auth User:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      const { email, verificationToken } = req.body;
      const verificationUrl = `https://uepadmission.vercel.app/verify?token=${verificationToken}`;
  
      // Optional: Log the data you're using
      console.log("📨 Preparing to send verification email to:", email);
      console.log("🔗 Verification URL:", verificationUrl);
  
      transporter.verify(function (error, success) {
        if (error) {
          console.error("❌ Transporter verification failed:", error);
          return res.status(500).json({ error: 'Email transporter not ready' });
        }
  
        console.log("✅ Email transporter verified, sending email...");
  
        transporter.sendMail({
          from: '"UEP eAdmission 📩" <uepverifier@gmail.com>', // Keep using Gmail address
          replyTo: "uepverifier@gmail.com", // Use the same address as "from"
          to: email,
          subject: "📩 Please Verify Your Email – UEP eAdmission Portal",
          text: `Hi there,
        
        Thank you for registering with UEP. To complete your registration, please verify your email by clicking the link below:
        ${verificationUrl}
        
        If you did not register, you can safely ignore this email.
        
        Best regards,
        The UEP eAdmission Team`,
        
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <h2 style="color: #004aad;">📢 Email Verification</h2>
              <p>Hi there,</p>
              <p>Thanks for registering with <strong>UEP eAdmission</strong>. Please verify your email address to complete the registration:</p>
              <p>
                <a href="${verificationUrl}" style="display: inline-block; background-color: #004aad; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                  Verify Email
                </a>
              </p>
              <p>If the button doesn’t work, copy and paste this link into your browser:</p>
              <p><a href="${verificationUrl}" style="color: #004aad;">${verificationUrl}</a></p>
              <p>If you didn’t request this, feel free to ignore it.</p>
              <hr />
              <p style="font-size: 12px; color: #888;">
                📩 This is an automated message – please do not reply.
              </p>
            </div>
          `,
        }, (err, info) => {
          if (err) {
            console.error("❌ Error sending email:", err);
            return res.status(500).json({ error: 'Failed to send verification email' });
          }
          
          console.log("✅ Verification email sent:", info.response);
          res.status(201).json({
            message: 'AuthUser created and verification email sent',
            userID: req.body.userID
          });
        });
        
        


      });
    });
  },
  


verifyEmail: (req, res) => {
    const { token } = req.query;
    AuthUser.findUserByToken(token, (err, result) => {
      if (err) {
        console.error('Error fetching AuthUser:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'AuthUser not found' });
      }
      res.json(result);
    });
  },

  
  getAuthUserById: (req, res) => {
    AuthUser.getById(req.params.id, (err, result) => {
      if (err) {
        console.error('Error fetching AuthUser:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!result) {
        return res.status(404).json({ message: 'AuthUser not found' });
      }
      res.json(result);
    });
  },

  updateAuthUser: (req, res) => {
    AuthUser.update(req.params.id, req.body, (err, result) => {
      if (err) {
        console.error('Error updating AuthUser:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'AuthUser updated successfully' });
    });
  },

  deleteAuthUser: (req, res) => {
    AuthUser.delete(req.params.id, (err, result) => {
      if (err) {
        console.error('Error deleting AuthUser:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'AuthUser deleted successfully' });
    });
  },

};
