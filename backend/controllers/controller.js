const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getAllEvents, saveEmailOrdersPaid } = require('../database/dbConnection');
const { sendEmail } = require('../smtp/smtpConfiguration');

exports.getData = async (req, res) => {
    const events = await getAllEvents();
    res.json({ message: "Here is your data from the controller.", data: events });
};

exports.ordersPaid = async (req, res) => {
    try {
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
        const emailInfo = await saveEmailOrdersPaid(req);

        res.status(200).json({ message: "Email sent successfully", email: emailInfo, previewEmailUrl: previewEmailUrl });

    } catch (error) {
        console.error('Failed to send email:', error.response?.data || error.message);
        res.status(500).json({
            message: 'Failed to send email:',
            result: response.data
        });
    }
};

exports.addWebhook = async (req, res) => {
    try {
        // Could be replaced with a graphql request
        const response = await axios.post(
            `https://681e95cbc1c291fa66347a13.mockapi.io/mockstore/admin/api/subscribe`,
            {
                topic: req.body.Webhook,
                callbackUrl: req.body.CallbackUrl
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': "TOKEN"
                }
            }
        );

        console.log('Webhook created successfully:', response.data.webhook);
        res.status(200).json({
            message: 'Webhook created successfully:',
            result: response.data
        });
    } catch (error) {
        console.error('Failed to create webhook:', error.response?.data || error.message);
        res.status(500).json({
            message: 'Failed to create webhook:',
            result: response.data
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