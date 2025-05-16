const express = require('express');
const router = express.Router();
const dataController = require('../controllers/emailController');

router.post('/orders-paid', dataController.ordersPaid);

module.exports = router;