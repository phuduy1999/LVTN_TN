const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class RegisterController {
    //[GET] /
    getAll(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .query('select IDLMH, NIENKHOA, HOCKY, NHOM, TENMH, MAGVDK, HO, TEN, TRINHDODK, NGAYTHI, SCT, THOIGIANTHI from LOPMONHOC, MONHOC, GIAOVIEN where LOPMONHOC.MAMH=MONHOC.MAMH and LOPMONHOC.MAGVDK=GIAOVIEN.MAGV and TRANGTHAI=1 order by GIAOVIEN.MAGV')
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
    getQuestions(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('iddk', sql.Int, req.body.IDDK)
                .execute('SP_GET_CAUHOITHI2');
        })
            .then(result => {
                const arrRecord = result.recordset;
                // console.log(result);
                const response = {
                    DS_CAUHOI: JSON.parse(Object.values(arrRecord[0])[0]),
                    DS_LUACHON: result.recordsets[1].map((r) => {
                        return r.LUACHONSV;
                    })
                }
                res.status(200).send(response);
            }).catch(err => {
                console.log(err)
                res.status(400).send(err);
            })
    }

    //[POST] /get-questions-for-testing
    getQuestionsForTesting(req, res) {
        console.log(req.body.SCT, req.body.TRINHDODK, req.body.MAMH);
        sqlConnect.then(pool => {
            return pool.request()
                .input('sct', sql.Int, req.body.SCT)
                .input('td', sql.NChar, req.body.TRINHDODK)
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .execute('SP_GET_CAUHOITHI_THU');
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
    getOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, req.params.id)
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

    //[GET] /:id/iddk
    getOneByIDDK(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('iddk', sql.Int, req.params.id)
                .query('select NIENKHOA, HOCKY, NHOM, TRINHDODK, THOIGIANTHI, SCT, NGAYTHI, LOPMONHOC.MAMH, TENMH from LOPMONHOC, MONHOC where IDLMH=(select IDLMH from DANGKY where IDDK=@iddk) and LOPMONHOC.MAMH=MONHOC.MAMH; select THOIGIANCONLAI_S from DANGKY where IDDK=@iddk')
        })
            .then(result => {
                const arrRecord = result.recordset;
                // console.log(arrRecord)
                const response = {
                    ...arrRecord[0],
                    ...result.recordsets[1][0]
                }
                res.status(200).send(response);
            }).catch(err => {
                console.log(err)
            })
    }

    //[POST] /check-register
    checkRegister(req, res) {
        console.log(req.body.NIENKHOA + req.body.HOCKY + req.body.NHOM + req.body.MAMH)
        sqlConnect.then(pool => {
            return pool.request()
                .input('hk', sql.SmallInt, req.body.HOCKY)
                .input('nhom', sql.SmallInt, req.body.NHOM)
                .input('nienkhoa', sql.NVarChar(10), req.body.NIENKHOA)
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .input('masv', sql.NChar(15), req.body.MASV)
                .query('exec SP_CHECK_DANGKY_LOPMH_SV @nienkhoa, @mamh, @hk, @nhom, @masv')
        })
            .then(result => {
                const arrRecord = result.recordset;
                console.log(result)
                res.status(200).send(arrRecord[0]);
            }).catch(err => {
                console.log(err)
                if (err.message.includes('kotontai')) {
                    res.status(400).send({ err: 'Không tồn tại thông tin đăng ký thi hoặc lớp môn học đã bị hủy!' });
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

    //[POST] /check-trial-register
    checkTrialRegister(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('sct', sql.Int, req.body.SCT)
                .input('tg', sql.Int, req.body.THOIGIANTHI)
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .input('td', sql.NChar(1), req.body.TRINHDODK)
                .execute('SP_CHECK_DANGKY_THITHU')
        })
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {
                if (err.message.includes('sctkd')) {
                    let soCau = err.message.split(' ')[err.message.split(' ').length - 1];
                    res.status(400).send({ err: 'Không đủ số câu thi cùng trình độ!. Số câu tối đa là ' + soCau });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[POST] /
    addOne(req, res) {
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
                    throw Error('Đăng ký thi không thành công!. Lớp môn học không tồn tại, bị hủy hoặc đã được đăng ký thi trước đó!');
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

    //[PUT] /:id
    updateOne(req, res) {
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
                    throw Error('Sửa đăng ký thi không thành công! Lớp môn học đã bị hủy!');
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
