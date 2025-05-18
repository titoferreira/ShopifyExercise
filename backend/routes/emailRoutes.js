const express = require('express')
const router = express.Router()
const dataController = require('../controllers/emailController')

router.post('/orders-paid', dataController.ordersPaid)
router.get('/list-emails', dataController.listEmails)

module.exports = router