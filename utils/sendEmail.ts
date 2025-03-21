import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const receivers = process.env.EMAIL_RECEIVER; // Supports multiple emails

// Validate environment variables
if (!user || !pass || !receivers) {
  console.error("❌ Missing email credentials or recipients in environment variables.");
  process.exit(1);
}

// Convert comma-separated emails into an array & trim spaces
const recipientList = receivers.split(',').map(email => email.trim());

// Path to the Playwright HTML report
const reportPath = path.resolve('playwright-report', 'index.html');

// Check if the report exists before sending the email
if (!fs.existsSync(reportPath)) {
  console.error("❌ Playwright HTML report not found at:", reportPath);
  process.exit(1);
}

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass },
});

// Email configuration
const mailOptions = {
  from: `GitHub Actions <${user}>`,
  to: recipientList, // Now supports multiple emails
  subject: '📊 Playwright Test Report (Pass/Fail)',
  html: `
    <p>Hello,</p>
    <p>The latest <strong>Playwright Test Report</strong> is attached.</p>
    <p>Best,<br>GitHub Actions</p>
  `,
  attachments: [
    {
      filename: 'Playwright-Report.html',
      path: reportPath,
      contentType: 'text/html',
    },
  ],
};

// Send the email
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('❌ Error sending email:', err);
    process.exit(1);
  } else {
    console.log('✅ Email sent successfully to:', recipientList.join(', '));
    console.log('📧 Response:', info.response);
  }
});
