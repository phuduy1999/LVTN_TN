const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class RecoveryController {
    //[GET] /
    getList(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .execute('SP_DB_DS_BACKUP');
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).json(arrRecord);
            }).catch(err => {
                console.log(err)
            })
    }

    //[POST] /backup
    backup(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('diengiai', sql.NVarChar(128), req.body.diengiai)
                .input('ghide', sql.SmallInt, req.body.ghide)
                .execute('SP_DB_BACKUP');
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).json(arrRecord);
            }).catch(err => {
                console.log(err)
                res.status(400).send({ err: err });
            })
    }

    //[POST] /restore/:position
    restoreByPosition(req, res) {
        const strLenh = 'ALTER DATABASE TN_TTTN SET SINGLE_USER WITH ROLLBACK IMMEDIATE; '
            + 'USE tempdb '
            + 'RESTORE DATABASE TN_TTTN FROM DEV_TN_TTTN WITH FILE= @position, REPLACE '
            + 'ALTER DATABASE TN_TTTN SET MULTI_USER; '
            + 'USE TN_TTTN'
        sqlConnect.then(pool => {
            return pool.request()
                .input('position', sql.SmallInt, req.params.position)
                .query(strLenh);
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).json(arrRecord);
            }).catch(err => {
                console.log(err)
                res.status(400).send({ err: err });
            })
    }
}

module.exports = new RecoveryController();
