import express from 'express';
import { User } from '../models/User';
import crypto from 'crypto';
import { createTestAccount, createProductionTransport } from '../config/email';

const router = express.Router();

// Generate reset token and save it
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token and expiry
    const resetToken = generateResetToken();
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    // Save token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Create email transport
    const transport = process.env.NODE_ENV === 'production' 
      ? createProductionTransport()
      : await createTestAccount();

    // Send email
    const info = await transport.sendMail({
      from: '"Photo Pixel" <noreply@photopixel.com>',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Reset Your Password</h2>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          <a href="${resetUrl}" style="
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
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;">
          <p style="color: #6B7280; font-size: 14px;">Photo Pixel - Professional Photography Equipment</p>
        </div>
      `,
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Error sending reset email' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Update password and clear reset token
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

export default router; 