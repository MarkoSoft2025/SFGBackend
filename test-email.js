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

transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Transporter verification failed:", error);
  } else {
    console.log("✅ Server is ready to send messages.");

    transporter.sendMail({
      from: '"UEP No-Reply" <uepverifier@gmail.com>',  // Display name shows 'UEP No-Reply'
      replyTo: "",                                     // No reply address set
      to: "markabayon@gmail.com",
      subject: "📩 Please Do Not Reply - UEP Test Email",
      text: "This is an automated email from UEP. Please do not reply.",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>📢 Automated Notification</h2>
          <p>This is a test email from the <strong>UEP Email System</strong>.</p>
          <p><em>Please do not reply to this message.</em></p>
          <hr />
          <small style="color: #888;">Sent from: uepverifier@gmail.com (no-reply mode)</small>
        </div>`,
        
    }, (err, info) => {
      if (err) {
        return console.error("❌ Error sending email:", err);
      }
      console.log("✅ Test email sent successfully:", info.response);
    });
  }
});

