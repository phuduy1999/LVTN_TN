const { sqlConnect, sql } = require('../config/db')

class StudentController {
    //[GET] /
    getAll(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .query('select * from SINHVIEN')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord);
            }).catch(err => {
                console.log(err)
            })
    }

    //[GET] /:id
    getOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('masv', sql.NChar(15), req.params.id)
                .query('select * from SINHVIEN where MASV=@masv')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord[0]);
            }).catch(err => {
                console.log(err)
            })
    }

    //[GET] /:email/email
    getOneByEmail(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('email', sql.NVarChar, req.params.email)
                .query('select * from SINHVIEN where EMAIL=@email')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord[0]);
            }).catch(err => {
                console.log(err)
            })
    }

    //[POST] /
    addOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('masv', sql.NChar(15), req.body.MASV)
                .input('ho', sql.NVarChar(50), req.body.HO)
                .input('ten', sql.NVarChar(15), req.body.TEN)
                .input('diachi', sql.NVarChar(200), req.body.DIACHI)
                .input('ngaysinh', sql.DateTime, req.body.NGAYSINH)
                .input('email', sql.NChar(50), req.body.EMAIL)
                .query('exec SP_THEMSV_TAIKHOANMD @masv, @ho, @ten, @ngaysinh, @diachi, @email');
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
                else res.status(400).send({ err: 'Lỗi thêm sinh viên!' });
            })
    }

    //[PUT] /:id
    updateOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('masv', sql.NChar(15), req.body.MASV)
                .input('ho', sql.NVarChar(50), req.body.HO)
                .input('ten', sql.NVarChar(15), req.body.TEN)
                .input('diachi', sql.NVarChar(200), req.body.DIACHI)
                .input('ngaysinh', sql.DateTime, req.body.NGAYSINH)
                .input('id', sql.NChar(50), req.params.id)
                .query('update SINHVIEN set MASV=@masv, HO=@ho, TEN=@ten, DIACHI=@diachi, NGAYSINH=@ngaysinh where MASV=@id');
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
                else res.status(400).send({ err: 'Lỗi sửa sinh viên!' });
            })
    }

    //[DELETE] /:id
    deleteOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('masv', sql.NChar(15), req.params.id)
                .query('exec SP_XOASV_TAIKHOAN @masv')
        })
            .then(result => {
                res.status(200).send({ result: result.rowsAffected[0] });
            }).catch(err => {
                console.log(err)
                if (err.message.includes('FK_DANGKY_SINHVIEN')) {
                    res.status(400).send({ err: 'Sinh viên đã đăng ký lớp môn học!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[GET] /:id/check
    checkFK(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('masv', sql.NChar(15), req.params.id)
                .execute('SP_CHECK_SINHVIEN')
        })
            .then(result => {
                res.status(200).send({ result: 1 });
            }).catch(err => {
                console.log(err)
                if (err.message.includes('FK_DANGKY_SINHVIEN')) {
                    res.status(400).send({ err: 'Sinh viên đã đăng ký lớp môn học!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[GET] /:id/class
    getStudentsInClass(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('idlmh', sql.Int, req.params.id)
                .query('select SINHVIEN.MASV, HO, TEN, NGAYSINH, DIACHI, EMAIL, ROUND(DIEM * 2, 0) / 2 as DIEM from SINHVIEN, DANGKY where SINHVIEN.MASV=DANGKY.MASV and IDLMH=@idlmh')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord);
            }).catch(err => {
                console.log(err)
            })
    }
}

module.exports = new StudentController();
