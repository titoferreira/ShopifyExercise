const axios = require('axios');
const fs = require('fs');
const path = require('path');

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
        console.error('Failed to create webhook:', error.message);
        res.status(500).json({
            message: 'Failed to create webhook:',
            result: error.message
        });
    }
};