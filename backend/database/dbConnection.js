// backend/db.js
const { Pool } = require('pg');

const getEventsSql = 'SELECT * FROM events';
const saveEmailSql = 'INSERT INTO emails (recipient, event, content, html_content, sent_at) VALUES ($1, $2, $3, $4, $5) RETURNING *';

const connection = new Pool({
    host: 'db',       // 'db' docker-compose name used to setup postgres
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'shopify_manager',
});

async function getAllEvents() {
    const result = await connection.query(getEventsSql);
    return result.rows;
}

async function saveEmailOrdersPaid(req) {
    let emailArr = [
        req.body.contact_email,
        3, // code for orders/paid
        "email_content",
        "html_email_content",
        new Date()
    ]

    const result = await connection.query(saveEmailSql, emailArr);
    return result.rows;
}

module.exports = {
    connection,
    getAllEvents,
    saveEmailOrdersPaid
};