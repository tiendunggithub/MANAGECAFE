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
                        ' PROD.NAME                         '+
                        ' ,PROD.PRICE                       '+
                        ' ,DETAILS.QUANTITY                 '+
                        ' ,convert_tz(DETAILS.STARTTIME,"+00:00","+7:00") as STARTTIME                '+
                        ' ,DETAILS.ENDTIME                  '+
                        ' ,TAB.NAME AS TABLENAME            '+
                    'FROM TABLE_DETAILS DETAILS             '+
                        ' INNER JOIN COFFEE_TABLE TAB       '+
                        '    ON TAB.ID = DETAILS.TABLE      '+
                        ' LEFT JOIN PRODUCT PROD            '+
                        '    ON PROD.ID = DETAILS.PRODUCT   '+
                    ' WHERE DETAILS.TABLE = ?               '+
                    ' ORDER BY DETAILS.STARTTIME '
        let id = req.params.tableId
        db.query(sql, [id], (err, response) => {
            if(err) throw err
            res.json(response)
        })
    },

    addItem: (req, res) => {
        var date;
        let sql = '	SELECT '+
                        ' PROD.NAME                         '+
                        ' ,PROD.PRICE                       '+
                        ' ,DETAILS.QUANTITY                 '+
                        ' ,DETAILS.STARTTIME                '+
                        ' ,DETAILS.ENDTIME                  '+
                        ' ,TAB.NAME AS TABLENAME            '+
                    'FROM TABLE_DETAILS DETAILS             '+
                        ' INNER JOIN COFFEE_TABLE TAB       '+
                        '    ON TAB.ID = DETAILS.TABLE      '+
                        ' LEFT JOIN PRODUCT PROD            '+
                        '    ON PROD.ID = DETAILS.PRODUCT   '+
                    ' WHERE DETAILS.TABLE = ?               '+
                    ' ORDER BY DETAILS.STARTTIME '
        let id = req.params.idTbl
        db.query(sql, [id], (err, response) => {
            if(err) throw err
            if (response.length == 0) {
                date = new Date();
                date = date.getFullYear() + '-' +
                ('00' + (date.getMonth()+1)).slice(-2) + '-' +
                ('00' + date.getDate()).slice(-2) + ' ' + 
                ('00' + date.getHours()).slice(-2) + ':' + 
                ('00' + date.getMinutes()).slice(-2) + ':' + 
                ('00' + date.getSeconds()).slice(-2);
            } else {
                date = response[0].STARTTIME
            }
            sql = "INSERT INTO `manage_cafe`.`table_details` (`PRODUCT`, `TABLE`, `STARTTIME`, `QUANTITY`) VALUES (?, ?, ?, ?)";
            
            db.query(sql, [req.body.idProd, id,date, req.body.quantity], (err, response) => {
                if(err) throw err
                sql = "UPDATE coffee_table SET STATUS = '1' WHERE (ID = ? AND STATUS = '0')";
                db.query(sql, [id], (err, response) => {
                    if(err) throw err
                    res.json(response)
                })
            })
        })
    }
}