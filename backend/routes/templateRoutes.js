const express = require('express');
const router = express.Router();
const dataController = require('../controllers/templateController');

router.get('/list-templates', dataController.listTemplates);
router.post('/insert-template', dataController.insertTemplate);
router.put('/update-template', dataController.updateTemplate);
router.delete('/delete-template', dataController.deleteTemplate);

module.exports = router;