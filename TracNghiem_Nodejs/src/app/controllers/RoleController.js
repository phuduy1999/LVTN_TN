const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class RoleController {
    //[GET] /
    getAll(req, res, next) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('sv', sql.NChar(15), 'SV')
                .query('select * from NHOMQUYEN where MANQ<>@sv')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord);
            }).catch(err => {
                console.log(err)
            })
    }
}

module.exports = new RoleController();
