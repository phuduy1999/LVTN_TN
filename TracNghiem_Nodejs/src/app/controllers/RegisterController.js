const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class RegisterController {
    //[GET] /
    getAll(req, res, next) {
        sqlConnect.then(pool => {
            return pool.request()
                .query('select IDLMH, NIENKHOA, HOCKY, NHOM, TENMH, MAGVDK, HO, TEN, TRINHDODK, NGAYTHI, SCT, THOIGIANTHI from LOPMONHOC, MONHOC, GIAOVIEN where LOPMONHOC.MAMH=MONHOC.MAMH and LOPMONHOC.MAGVDK=GIAOVIEN.MAGV order by GIAOVIEN.MAGV')
        })
            .then(result => {
                const arrRecord = result.recordset;
                console.log(arrRecord);
                res.status(200).send(arrRecord);
            }).catch(err => {
                console.log(err)
            })
    }

    //[POST] /get-questions
    getQuestions(req, res, next) {
        console.log(req.body.SCT, req.body.TRINHDODK, req.body.MAMH);
        sqlConnect.then(pool => {
            return pool.request()
                .input('sct', sql.Int, req.body.SCT)
                .input('td', sql.NChar, req.body.TRINHDODK)
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .execute('SP_GET_CAUHOITHI2');
        })
            .then(result => {
                const arrRecord = result.recordset;
                // console.log(result);
                res.status(200).send(JSON.parse(Object.values(arrRecord[0])[0]));
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
                .query('select NIENKHOA, HOCKY, NHOM, TRINHDODK, THOIGIANTHI, SCT, NGAYTHI, LOPMONHOC.MAMH, TENMH from LOPMONHOC, MONHOC where IDLMH=@idlmh and LOPMONHOC.MAMH=MONHOC.MAMH')
        })
            .then(result => {
                const arrRecord = result.recordset;
                // console.log(arrRecord)
                res.status(200).send(arrRecord[0]);
            }).catch(err => {
                console.log(err)
            })
    }

    //[GET] /check-register
    checkRegister(req, res, next) {
        console.log(req.body.NIENKHOA + req.body.HOCKY + req.body.NHOM + req.body.MAMH)
        sqlConnect.then(pool => {
            return pool.request()
                .input('hk', sql.SmallInt, req.body.HOCKY)
                .input('nhom', sql.SmallInt, req.body.NHOM)
                .input('nienkhoa', sql.NVarChar(10), req.body.NIENKHOA)
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .input('masv', sql.NChar(15), req.body.MASV)
                .query('exec SP_CHECK_DANGKY @nienkhoa, @mamh, @hk, @nhom, @masv')
        })
            .then(result => {
                const arrRecord = result.recordset;
                console.log(result)
                res.status(200).send(arrRecord[0]);
            }).catch(err => {
                console.log(err)
                if (err.message.includes('kotontai')) {
                    res.status(400).send({ err: 'Không tồn tại thông tin đăng ký thi!' });
                }
                else if (err.message.includes('dathi')) {
                    res.status(400).send({ err: 'Bạn đã thi môn này!' });
                }
                else if (err.message.includes('kodungngaythi')) {
                    res.status(400).send({ err: 'Không đúng ngày thi!' });
                }
                else if (err.message.includes('chuadklopmh')) {
                    res.status(400).send({ err: 'Bạn chưa đăng ký lớp môn học này!' });
                }
                else if (err.message.includes('chuadkthi')) {
                    res.status(400).send({ err: 'Lớp môn học chưa được giáo viên đăng ký thi!' });
                }
                else res.status(400).send({ err: err.message });
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
                .required(),
            MAMH: Joi.string()
                .required(),
            MAGVDK: Joi.string()
                .required(),
            TRINHDODK: Joi.string()
                .required(),
            NGAYTHI: Joi.date()
                // .min('now')
                .required(),
            SCT: Joi.number()
                .required(),
            THOIGIANTHI: Joi.number()
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
                .input('td', sql.NChar(1), req.body.TRINHDODK)
                .input('hocky', sql.SmallInt, req.body.HOCKY)
                .input('nhom', sql.SmallInt, req.body.NHOM)
                .input('sct', sql.Int, req.body.SCT)
                .input('tg', sql.Int, req.body.THOIGIANTHI)
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .input('magvdk', sql.NChar(15), req.body.MAGVDK)
                .input('ngaythi', sql.DateTime, req.body.NGAYTHI)
                .query('exec SP_THEM_DANGKY_CHECK_SCT @td, @nienkhoa, @mamh, @magvdk, @ngaythi, @hocky, @nhom, @sct, @tg');
        })
            .then(result => {
                if (result.rowsAffected[0] === 0) {
                    throw Error('Đăng ký thi không thành công!. Lớp môn học không tồn tại hoặc đã được đăng ký thi trước đó!');
                }
                res.send(req.body);
            }).catch(err => {
                if (err.message.includes('sctkd')) {
                    let soCau = err.message.split(' ')[err.message.split(' ').length - 1];
                    res.status(400).send({ err: 'Không đủ số câu thi cùng trình độ!. Số câu tối đa là ' + soCau });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[DELETE] /:id
    deleteOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('id', sql.Int, req.params.id)
                .query('exec SP_HUY_DANGKY @id')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send({ result: result.rowsAffected[0] });
            }).catch(err => {
                console.log(err)
                if (err.message.includes('dacosvthi')) {
                    res.status(400).send({ err: 'Đã có sinh viên thi!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[GET] /:id/check
    checkFK(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, req.params.id)
                .execute('SP_CHECK_DANGKY_HUY')
        })
            .then(result => {
                res.status(200).send({ result: 1 });
            }).catch(err => {
                console.log(err)
                if (err.message.includes('dacosvthi')) {
                    res.status(400).send({ err: 'Đã có sinh viên thi!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[PUT] /:id/edit
    updateOne(req, res) {
        const schema = Joi.object({
            TRINHDODK: Joi.string()
                .required(),
            NGAYTHI: Joi.date()
                // .min('now')
                .required(),
            SCT: Joi.number()
                .required(),
            THOIGIANTHI: Joi.number()
                .required(),
        })

        const result = schema.validate(req.body);
        if (result.error) {
            res.status(400).send({ err: result.error.details[0].message });
            return;
        }

        sqlConnect.then(pool => {
            return pool.request()
                .input('td', sql.NChar(1), req.body.TRINHDODK)
                .input('sct', sql.Int, req.body.SCT)
                .input('tg', sql.Int, req.body.THOIGIANTHI)
                .input('ngaythi', sql.DateTime, req.body.NGAYTHI)
                .input('id', sql.Int, req.params.id)
                .query('exec SP_SUA_DANGKY_CHECK_SCT @td, @ngaythi, @sct, @tg, @id');
        })
            .then(result => {
                if (result.rowsAffected[0] === 0) {
                    throw Error('Sửa đăng ký thi không thành công!');
                }
                res.send(req.body);
            }).catch(err => {
                if (err.message.includes('sctkd')) {
                    let soCau = err.message.split(' ')[err.message.split(' ').length - 1];
                    res.status(400).send({ err: 'Không đủ số câu thi cùng trình độ!. Số câu tối đa là ' + soCau });
                }
                else if (err.message.includes('ngaythiquakhu')) {
                    res.status(400).send({ err: 'Ngày thi mới ở quá khứ!' });
                }
                else if (err.message.includes('svdathi')) {
                    res.status(400).send({ err: 'Đã có sinh viên thi!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[GET] /:id/check-before-edit
    checkBeforeEdit(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, req.params.id)
                .execute('SP_CHECK_DANGKY_TRUOC_SUA')
        })
            .then(result => {
                res.status(200).send({ result: 1 });
            }).catch(err => {
                // console.log(err)
                if (err.message.includes('svdathi')) {
                    res.status(400).send({ err: 'Đã có sinh viên thi!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }
}

module.exports = new RegisterController();
