const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendResetEmail = async (email, resetToken) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request - Photo Pixel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <img src="https://your-logo-url.com/logo.png" alt="Photo Pixel" style="width: 150px; margin-bottom: 20px;">
          <h2 style="color: #4F46E5; margin-bottom: 20px;">Reset Your Password</h2>
          <p style="color: #374151; margin-bottom: 20px;">You recently requested to reset your password for your Photo Pixel account. Click the button below to proceed:</p>
          <a href="${resetUrl}" style="
            display: inline-block;
            background: linear-gradient(to right, #7C3AED, #2563EB);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 16px 0;
            font-weight: 500;
          ">Reset Password</a>
          <p style="color: #6B7280; margin-top: 20px;">If you didn't request this, you can safely ignore this email. Your password will remain unchanged.</p>
          <p style="color: #6B7280;">This link will expire in 1 hour for security reasons.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6B7280; font-size: 14px;">Photo Pixel - Professional Photography Equipment</p>
            <p style="color: #6B7280; font-size: 12px;">This is an automated message, please do not reply.</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Reset email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Send email error:', error);
    throw new Error('Failed to send reset email');
  }
};

module.exports = { sendResetEmail };