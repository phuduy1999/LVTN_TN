const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class RecordMarkController {
    //[POST] /
    addOne(req, res, next) {
        // console.log(req.body, req.body.length)
        const info = req.body.pop();
        // console.log(info, req.body);
        //create table
        const ctbt = new sql.Table('CTBTType')
        ctbt.columns.add('IDCAUHOI', sql.Int);
        ctbt.columns.add('STT', sql.Int);
        ctbt.columns.add('LUACHONSV', sql.NVarChar(30));
        req.body.forEach((ct, idx) => {
            ctbt.rows.add(ct.IDCAUHOI, ct.STT, ct.LUACHONSV);
        })
        // console.log(ctbt);

        sqlConnect.then(pool => {
            console.log(ctbt);
            return pool.request()
                .input('ctbt', sql.TVP, ctbt)
                .input('masv', sql.NChar(15), info.MASV)
                .input('id', sql.Int, info.IDLMH)
                .input('diem', sql.Float, info.DIEM)
                .execute('SP_GHI_DIEM_CTBT');
        })
            .then(result => {
                const arrRecord = result.recordset;
                console.log(result.rowsAffected)
                if (result.rowsAffected[0] !== 1) {
                    throw Error("Ghi điểm không thành công");
                }
                res.status(200).send(req.body);
            }).catch(err => {
                console.log(err)
                res.status(400).send({ err: "Ghi điểm không thành công" });
            })
    }
}

module.exports = new RecordMarkController();
