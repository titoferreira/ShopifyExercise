const express = require('express');
const router = express.Router();
const dataController = require('../controllers/webhooksController');

router.post('/add-webhook', dataController.addWebhook);

module.exports = router;