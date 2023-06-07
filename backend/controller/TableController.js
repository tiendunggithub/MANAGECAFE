'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM coffee_table'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    }
}