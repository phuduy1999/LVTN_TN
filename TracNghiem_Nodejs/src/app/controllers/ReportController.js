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
                result.recordsets[1][0].MAMH = result.recordsets[1][0].MAMH.trim();
                result.recordsets[0].forEach((r) => {
                    r.MASV = r.MASV.trim();
                    r.EMAIL = r.EMAIL.trim();
                })
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
                result.recordsets[1][0].MAMH = result.recordsets[1][0].MAMH.trim();
                result.recordsets[0].forEach((r) => {
                    r.MASV = r.MASV.trim();
                    r.EMAIL = r.EMAIL.trim();
                })
                const tables = {
                    SINHVIEN: result.recordsets[0],
                    LOPMONHOC: result.recordsets[1],
                }
                res.status(200).json(tables);
            }).catch(err => {
                console.log(err)
            })
    }

    //[GET] /list-class-opened/:status
    getListClassReport(req, res, next) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('trangthai', sql.SmallInt, req.params.status)
                .execute('SP_REPORT_LOPMONHOC');
        })
            .then(result => {
                const arrRecord = result.recordset;
                arrRecord.forEach(a => {
                    a.MAGV = a.MAGV.trim();
                })
                res.status(200).json({ LOPMONHOC: arrRecord });
            }).catch(err => {
                console.log(err)
            })
    }

    //[POST] /questions-history
    getQuestionsHistory(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, req.body.IDLMH)
                .input('masv', sql.NChar(15), req.body.MASV)
                .query('exec SP_GET_CAUHOITHI_LICHSU2 @idlmh, @masv');
        })
            .then(result => {
                const arrRecord = result.recordset;
                //flat json
                const values = JSON.parse(Object.values(arrRecord[0])[0]);
                const arr = values.map(v => {
                    if (!v || !v.IDCAUHOI) return {};
                    return {
                        IDCAUHOI: v.IDCAUHOI,
                        STT: v.STT,
                        LUACHONSV: v.LUACHONSV,
                        ...v.BODE[0]
                    };
                })
                res.status(200).send({ CAUHOI: arr });
            }).catch(err => {
                console.log(err)
            })
    }
}

module.exports = new ReportController();
