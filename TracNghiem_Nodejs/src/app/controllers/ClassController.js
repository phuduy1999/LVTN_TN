const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class ClassController {
    //[GET] /
    getAll(req, res, next) {
        sqlConnect.then(pool => {
            return pool.request()
                .query('select IDLMH, NIENKHOA, HOCKY, NHOM, SOSVTT, TENKH, TENMH, GIAOVIEN.MAGV, HO, TEN from LOPMONHOC, KHOA, MONHOC, GIAOVIEN where LOPMONHOC.MAKH=KHOA.MAKH and LOPMONHOC.MAMH=MONHOC.MAMH and LOPMONHOC.MAGV=GIAOVIEN.MAGV')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord);
            }).catch(err => {
                console.log(err)
            })
    }

    //[GET] /:id
    getOne(req, res, next) {
        const id = req.params.id;
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, id)
                .query('select * from LOPMONHOC where IDLMH=@idlmh')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord[0]);
            }).catch(err => {
                console.log(err)
            })
    }

    //[POST] /
    addOne(req, res, next) {
        const schema = Joi.object({
            NIENKHOA: Joi.string()
                .max(10)
                .required(),
            HOCKY: Joi.number()
                .min(1)
                .max(2)
                .required(),
            NHOM: Joi.number()
                .min(1)
                .required(),
            SOSVTT: Joi.number()
                .min(1)
                .required(),
            MAKH: Joi.string()
                .required(),
            MAMH: Joi.string()
                .required(),
            MAGV: Joi.string()
                .required(),
        })

        const result = schema.validate(req.body);
        if (result.error) {
            res.status(400).send({ err: result.error.details[0].message });
            return;
        }

        sqlConnect.then(pool => {
            return pool.request()
                .input('nienkhoa', sql.NVarChar(10), req.body.NIENKHOA)
                .input('hocky', sql.SmallInt, req.body.HOCKY)
                .input('nhom', sql.SmallInt, req.body.NHOM)
                .input('sosvtt', sql.Int, req.body.SOSVTT)
                .input('makh', sql.NChar(15), req.body.MAKH)
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .input('magv', sql.NChar(15), req.body.MAGV)
                .input('tddk', sql.NChar(1), '#')
                .query('insert into LOPMONHOC(NIENKHOA, HOCKY, NHOM, SOSVTT, MAKH, MAMH, MAGV, TRINHDODK) values (@nienkhoa, @hocky, @nhom, @sosvtt, @makh, @mamh, @magv, @tddk)');
        })
            .then(result => {
                if (result.rowsAffected[0] === 1) {
                    res.send(req.body);
                }
            }).catch(err => {
                if (err.message.includes('PRIMARY KEY')) {
                    res.status(400).send({ err: 'Trùng khóa chính!' });
                }
                else if (err.message.includes('UNIQUE KEY')) {
                    res.status(400).send({ err: 'Trùng khóa duy nhất!' });
                }
                else res.status(400).send({ err: 'Lỗi thêm lớp môn học!' });
            })
    }

    //[PUT] /:id/edit
    updateOne(req, res) {
        const schema = Joi.object({
            NIENKHOA: Joi.string()
                .max(10)
                .required(),
            HOCKY: Joi.number()
                .min(1)
                .max(2)
                .required(),
            NHOM: Joi.number()
                .min(1)
                .required(),
            SOSVTT: Joi.number()
                .min(1)
                .required(),
            MAKH: Joi.string()
                .required(),
            MAMH: Joi.string()
                .required(),
            MAGV: Joi.string()
                .required(),
        })

        const result = schema.validate(req.body);
        if (result.error) {
            res.status(400).send({ err: result.error.details[0].message });
            return;
        }

        console.log(req.params, req.body)

        sqlConnect.then(pool => {
            return pool.request()
                .input('nienkhoa', sql.NVarChar(10), req.body.NIENKHOA)
                .input('hocky', sql.SmallInt, req.body.HOCKY)
                .input('nhom', sql.SmallInt, req.body.NHOM)
                .input('sosvtt', sql.Int, req.body.SOSVTT)
                .input('makh', sql.NChar(15), req.body.MAKH)
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .input('magv', sql.NChar(15), req.body.MAGV)
                .input('id', sql.Int, req.params.id)
                .execute('SP_SUA_LOPMONHOC');
        })
            .then(result => {
                console.log(result);
                if (result.rowsAffected[0] === 1) {
                    res.send(req.body);
                } else {
                    throw Error('Không có lớp nào được cập nhật!')
                }
            }).catch(err => {
                if (err.message.includes('PRIMARY KEY')) {
                    res.status(400).send({ err: 'Trùng khóa chính!' });
                }
                else if (err.message.includes('UNIQUE KEY')) {
                    res.status(400).send({ err: 'Trùng khóa duy nhất!' });
                }
                else if (err.message.includes('daduocdkthi')) {
                    res.status(400).send({ err: 'Lớp môn học đã được đăng ký thi!' });
                }
                else if (err.message.includes('svdadklopmonhoc')) {
                    res.status(400).send({ err: 'Sinh viên đã đăng ký lớp môn học!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[DELETE] /:id
    deleteOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, req.params.id)
                .query('delete from LOPMONHOC where IDLMH=@idlmh')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send({ result: result.rowsAffected[0] });
            }).catch(err => {
                console.log(err)
                if (err.message.includes('FK_DANGKY_LOPMONHOC')) {
                    res.status(400).send({ err: 'Lớp môn học đã được sinh viên đăng ký!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[GET] /:id/check
    checkFK(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, req.params.id)
                .execute('SP_CHECK_LOPMONHOC')
        })
            .then(result => {
                res.status(200).send({ result: 1 });
            }).catch(err => {
                console.log(err)
                if (err.message.includes('FK_DANGKY_LOPMONHOC')) {
                    res.status(400).send({ err: 'Lớp môn học đã được sinh viên đăng ký!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[GET] /:id/check-before-edit
    checkBeforeEdit(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, req.params.id)
                .execute('SP_CHECK_LOPMONHOC_TRUOC_SUA')
        })
            .then(result => {
                res.status(200).send({ result: 1 });
            }).catch(err => {
                console.log(err)
                if (err.message.includes('daduocdkthi')) {
                    res.status(400).send({ err: 'Lớp môn học đã được đăng ký thi!' });
                }
                else if (err.message.includes('svdadklopmonhoc')) {
                    res.status(400).send({ err: 'Sinh viên đã đăng ký lớp môn học!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }
}

module.exports = new ClassController();
