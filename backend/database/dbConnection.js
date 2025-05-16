const { Pool } = require('pg');

const connection = new Pool({
    host: 'db',       // 'db' docker-compose name used to setup postgres
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'shopify_manager',
});

//Events
async function getAllEvents() {
    const result = await connection.query(getEventsSql);
    return result.rows;
}

async function getEventByName(name) {
    const result = await connection.query(getEventByNameSql, [name]);
    if (result.rows.length === 0) {
        throw new Error(`No event found with name: ${name}`);
    }
    return result.rows[0].code;
}

async function getEventByCode(code) {
    const result = await connection.query(getEventByCodeSql, [code]);
    if (result.rows.length === 0) {
        throw new Error(`No event found with code: ${code}`);
    }
    return result.rows[0].event;
}

//Emails
async function insertEmail(req, event) {
    let code = await getEventByName(event)

    let emailArr = [
        req.body.contact_email,
        code,
        "email_content",
        "html_email_content",
        new Date()
    ]

    const result = await connection.query(insertEmailSql, emailArr);
    return result.rows;
}

async function getEmails() {
    return await connection.query(getEmailsSql);
}

//Templates
async function insertTemplate(template, code) {
    // let code = await getEventByName(event)

    let templateArr = [
        template,
        code
    ]

    const result = await connection.query(insertTemplateSql, templateArr);
    return result.rowCount;
}

async function updateTemplate(template, code) {
    // let code = await getEventByName(event)

    let templateArr = [
        template,
        code
    ]

    const result = await connection.query(updateTemplateSql, templateArr);
    return result.rowCount;
}

async function getTemplates() {
    const result = await connection.query(getTemplatesSql);
    return result.rows;
}

async function deleteTemplate(code) {
    // let code = await getEventByName(event)

    const result = await connection.query(deleteTemplateSql, [code]);
    return result.rowCount;
}

//Events CRUD operations
const getEventsSql = 'SELECT * FROM events';
const getEventByNameSql = 'SELECT code FROM events WHERE name = $1';
const getEventByCodeSql = 'SELECT name FROM events WHERE code = $1';

//Emails CRUD operations
const getEmailsSql = 'SELECT * FROM emails';
const insertEmailSql = 'INSERT INTO emails (recipient, event, content, html_content, sent_at) VALUES ($1, $2, $3, $4, $5) RETURNING *';

//Template CRUD operations
const getTemplatesSql = 'SELECT * FROM templates';
const insertTemplateSql = 'INSERT INTO templates (template, event) VALUES ($1, $2) RETURNING *';
const updateTemplateSql = 'UPDATE templates SET template = $1 WHERE event = $2';
const deleteTemplateSql = 'DELETE FROM templates WHERE event = $1';

module.exports = {
    connection,
    getAllEvents,
    getEventByCode,
    getEmails,
    insertEmail,
    getTemplates,
    insertTemplate,
    updateTemplate,
    deleteTemplate
};