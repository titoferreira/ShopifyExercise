const nodemailer = require('nodemailer');
require('dotenv').config();

async function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

async function sendEmail({ to, subject, html }) {
    try {
        const transporter = await createTransporter();

        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html,
        });

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return nodemailer.getTestMessageUrl(info);
    } catch (error) {
        console.error('Failed to send test email:', error);
        throw error;
    }
}

module.exports = {
    sendEmail,
};
