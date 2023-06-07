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
    },

    getDetails: (req, res) => {
        let sql = '	SELECT '+
                        ' PROD.name '+
                        ' ,PROD.price '+
                        ' ,PROD.quantity '+
                        ' ,DETAILS.STARTTIME '+
                        ' ,DETAILS.ENDTIME '+
                    'FROM TABLE_DETAILS DETAILS '+
                        ' INNER JOIN COFFEE_TABLE TAB   '+
                        '    ON TAB.ID = DETAILS.TABLE              '+
                        ' LEFT JOIN PRODUCT PROD        '+
                        '    ON PROD.ID = DETAILS.PRODUCT           '+
                    ' WHERE DETAILS.TABLE = ?'
        let id = req.params.tableId
        db.query(sql, [id], (err, response) => {
            if(err) throw err
            res.json(response)
        })
        
    }
}