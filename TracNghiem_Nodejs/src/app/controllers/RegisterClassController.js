const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class RegisterClassController {
    //[GET] /:id
    getClasses(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('masv', sql.NChar(15), req.params.id)
                .query('select * from LOPMONHOC, MONHOC where LOPMONHOC.MAMH=MONHOC.MAMH and IDLMH in (select IDLMH from DANGKY where MASV=@masv) order by NGAYTHI desc');
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord);
            }).catch(err => {
                console.log(err)
            })
    }

    //[POST] /
    addRegisterClass(req, res, next) {
        const schema = Joi.object({
            NIENKHOA: Joi.string()
                .max(10)
                .required(),
            HOCKY: Joi.number()
                .min(1)
                .max(2)
                .required(),
            NHOM: Joi.number()
                .required(),
            MAMH: Joi.string()
                .required(),
            MASV: Joi.string()
                .required(),
        })

        const result = schema.validate(req.body);
        if (result.error) {
            res.status(400).send({ err: result.error.details[0].message });
            return;
        }

        sqlConnect.then(pool => {
            return pool.request()
                .input('hk', sql.SmallInt, req.body.HOCKY)
                .input('nhom', sql.SmallInt, req.body.NHOM)
                .input('nienkhoa', sql.NVarChar(10), req.body.NIENKHOA)
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .input('masv', sql.NChar(15), req.body.MASV)
                .query('exec SP_DANGKY_LOPMH_SV @nienkhoa, @mamh, @hk, @nhom, @masv')
        })
            .then(result => {
                const arrRecord = result.recordset;
                console.log(arrRecord)
                res.status(200).send(req.body);
            }).catch(err => {
                console.log(err)
                if (err.message.includes('kotontai')) {
                    res.status(400).send({ err: 'Không tồn tại thông tin lớp môn học!' });
                }
                else if (err.message.includes('dathi')) {
                    res.status(400).send({ err: 'Lớp môn học đã được thi!' });
                }
                else if (err.message.includes('UK_DANGKY')) {
                    res.status(400).send({ err: 'Bạn đã đăng ký lớp môn học này!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }
}

module.exports = new RegisterClassController();