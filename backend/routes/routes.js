const express = require('express');
const router = express.Router();
const dataController = require('../controllers/controller');

router.get('/data', dataController.getData);
router.post('/add-webhook', dataController.addWebhook);
router.post('/orders-paid', dataController.ordersPaid);

module.exports = router;