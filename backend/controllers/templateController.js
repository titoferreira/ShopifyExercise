const fs = require('fs');
const path = require('path');
const { getTemplates, insertTemplate, updateTemplate, deleteTemplate, getEventByCode } = require('../database/dbConnection');

exports.listTemplates = async (req, res) => {
    try {
        let allTemplates = await getTemplates()

        res.status(200).json({ templates: allTemplates })

    } catch (error) {
        console.error('Failed to list templates:', error.message)
        res.status(500).json({
            message: 'Failed to list templates:',
            result: error.message
        });
    }
};

exports.insertTemplate = async (req, res) => {
    try {
        let template = req.body.template
        let event = req.body.event

        let rowsInserted = await insertTemplate(template, event)
        if (rowsInserted === 0)
            res.status(200).json({ message: "No templates were inserted." })

        res.status(200).json({ message: "template inserted!" });

    } catch (error) {
        console.error('Failed to insert template:', error.message)
        res.status(500).json({
            message: 'Failed to insert template:',
            result: error.message
        });
    }
};

exports.updateTemplate = async (req, res) => {
    try {
        let template = req.body.template
        let event = req.body.event

        let rowsUpdated = await updateTemplate(template, event)
        if (rowsUpdated === 0)
            res.status(200).json({ message: "No templates were updated." })

        res.status(200).json({ message: "template updated!" })

    } catch (error) {
        console.error('Failed to update template:', error.message);
        res.status(500).json({
            message: 'Failed to update template:',
            result: error.message
        });
    }
};

exports.deleteTemplate = async (req, res) => {
    try {
        let event = req.body.event

        let rowsDeleted = await deleteTemplate(event)
        if (rowsDeleted === 0)
            res.status(200).json({ message: "No templates were deleted." })

        res.status(200).json({ message: "template deleted!" })

    } catch (error) {
        console.error('Failed to delete template:', error.message)
        res.status(500).json({
            message: 'Failed to delete template:',
            result: error.message
        });
    }
};