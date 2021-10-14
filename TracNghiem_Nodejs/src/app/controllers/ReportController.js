const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class ReportController {
    //[GET] /list-signature/:id
    getListSignature(req, res, next) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, req.params.id)
                .execute('SP_REPORT_DSKYTEN');
        })
            .then(result => {
                const arrRecord = result.recordset;
                const tables = {
                    SINHVIEN: result.recordsets[0],
                    LOPMONHOC: result.recordsets[1],
                }
                res.status(200).json(tables);
            }).catch(err => {
                console.log(err)
            })
    }

    //[GET] /transcript/:id
    getTranscript(req, res, next) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, req.params.id)
                .execute('SP_REPORT_BANGDIEM');
        })
            .then(result => {
                const arrRecord = result.recordset;
                const tables = {
                    SINHVIEN: result.recordsets[0],
                    LOPMONHOC: result.recordsets[1],
                }
                res.status(200).json(tables);
            }).catch(err => {
                console.log(err)
            })
    }
}

module.exports = new ReportController();
