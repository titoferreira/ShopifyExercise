const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { insertEmail } = require('../database/dbConnection');
const { sendEmail } = require('../smtp/smtpConfiguration');

exports.ordersPaid = async (req, res) => {
    try {
        let event = 'orders/paid'
        let first_name = req.body.customer.first_name;
        let to_email = req.body.contact_email;

        const htmlContent = getHTMLTemplate(first_name, to_email);

        let mailOptions = {
            to: to_email,
            subject: 'New Order/Paid',
            html: htmlContent
        }

        //send email
        const previewEmailUrl = await sendEmail(mailOptions)

        //save email 
        const emailInfo = await insertEmail(req, event);

        res.status(200).json({ message: "Email sent successfully", email: emailInfo, previewEmailUrl: previewEmailUrl });

    } catch (error) {
        console.error('Failed to send email:', error.message);
        res.status(500).json({
            message: 'Failed to send email:',
            result: error.message
        });
    }
};

function getHTMLTemplate(userName, userEmail) {
    const templatePath = path.join(__dirname, '../templates', 'orderPaid.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf8');

    htmlContent = htmlContent.replace('{{user}}', userName);
    htmlContent = htmlContent.replace('{{email}}', userEmail);
    return htmlContent;
}