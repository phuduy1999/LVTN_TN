const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class TypeController {
    //[GET] /
    getAll(req, res, next) {
        sqlConnect.then(pool => {
            return pool.request()
                .query('select * from LOAICAUHOI')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).json(arrRecord);
            }).catch(err => {
                console.log(err)
            })
    }

    //[GET] /:id
    getOne(req, res, next) {
        const ma = req.params.id;
        sqlConnect.then(pool => {
            return pool.request()
                .input('malch', sql.NVarChar, ma)
                .query('select * from LOAICAUHOI where MALOAICH=@malch')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord[0]);
            }).catch(err => {
                console.log(err)
            })
    }
}

module.exports = new TypeController();
