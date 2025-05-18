const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { insertEmail, getTemplate, getEmails } = require('../database/dbConnection');
const { sendEmail } = require('../smtp/smtpConfiguration');

exports.listEmails = async (req, res) => {
    try {
        const emails = await getEmails();

        res.status(200).json({ emails: emails })
    } catch (error) {
        console.error('Failed to get emails:', error.message);
        res.status(500).json({
            message: 'Failed to get emails:',
            result: error.message
        });
    }
};

exports.ordersPaid = async (req, res) => {
    try {
        let event = 3 //'orders/paid'
        let first_name = req.body.customer.first_name;
        let to_email = req.body.contact_email;

        // const htmlContent = getHTMLTemplate(first_name, to_email);
        const htmlContent = await getTemplate(event);
        if (htmlContent.length === 0)
            res.status(404).json({ message: "Could not found an email template for the requested event" })

        let mailOptions = {
            to: to_email,
            subject: 'New Order/Paid',
            html: fillTemplateProperties(req, htmlContent[0].template)
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

function fillTemplateProperties(req, htmlContent) {

    htmlContent = htmlContent.replace('{{orderId}}', req.body.id);
    htmlContent = htmlContent.replace('{{orderDate}}', req.body.created_at);
    htmlContent = htmlContent.replace('{{user}}', req.body.customer.first_name);
    htmlContent = htmlContent.replace('{{price}}', req.body.total_price);
    htmlContent = htmlContent.replace('{{totalAmount}}', req.body.total_price);
    htmlContent = htmlContent.replace('{{name}}', req.body.line_items[0].name);
    htmlContent = htmlContent.replace('{{quantity}}', req.body.line_items[0].current_quantity);
    htmlContent = htmlContent.replace('{{paymentMethod}}', req.body.payment_gateway_names[0]);

    return htmlContent;
}