const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class HistoryTestController {
    //[POST] /
    getHistoryTest(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('masv', sql.NChar(15), req.body.MASV)
                .execute('SP_GET_LICHSUTHI');
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord);
            }).catch(err => {
                console.log(err)
            })
    }

    //[POST] /get-questions-history
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
                res.status(200).send(arr);
            }).catch(err => {
                console.log(err)
            })
    }
}

module.exports = new HistoryTestController();
