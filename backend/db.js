'use strict';
const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DB_HOST || "Localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "123456",
    database: process.env.DB_NAME || "manage_cafe",
    multipleStatements: true
});

module.exports = db