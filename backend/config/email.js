
const nodemailer = require('nodemailer');

const createTransport = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD // Use App Password instead of regular password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const sendResetEmail = async (email, token) => {
  const transporter = createTransport();

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const mailOptions = {
    from: `"Photo Pixel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your password - Photo Pixel",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Reset Your Password</h2>
        <p>You requested to reset your password. Click the link below to create a new password:</p>
        <a href="${resetURL}" style="
          display: inline-block;
          background: linear-gradient(to right, #7C3AED, #2563EB);
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          margin: 16px 0;
        ">Reset Password</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw new Error("Failed to send reset email");
  }
};

module.exports = { sendResetEmail };
