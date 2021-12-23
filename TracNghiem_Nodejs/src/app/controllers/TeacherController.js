const { sqlConnect, sql } = require('../config/db')

class TeacherController {
    //[GET] /
    getAll(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .query('select MAGV, HO, TEN, DIACHI, SDT, EMAIL, TENKH from GIAOVIEN, KHOA where GIAOVIEN.MAKH=KHOA.MAKH order by TEN, TENKH ASC')
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
                .input('magv', sql.NVarChar, req.params.id)
                .query('select MAGV, HO, TEN, DIACHI, SDT, GIAOVIEN.EMAIL, MAKH, MANQ from GIAOVIEN, TAIKHOAN where MAGV=@magv and GIAOVIEN.EMAIL=TAIKHOAN.EMAIL')
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
                .query('select * from GIAOVIEN where EMAIL=@email')
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
                .input('magv', sql.NChar(15), req.body.MAGV)
                .input('ho', sql.NVarChar(50), req.body.HO)
                .input('ten', sql.NVarChar(15), req.body.TEN)
                .input('diachi', sql.NVarChar(200), req.body.DIACHI)
                .input('sdt', sql.NChar(12), req.body.SDT)
                .input('email', sql.NChar(50), req.body.EMAIL)
                .input('makh', sql.NChar(15), req.body.MAKH)
                .input('manq', sql.NChar(15), req.body.MANQ)
                .execute('SP_THEMGV_TAIKHOANMD');
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
                else res.status(400).send({ err: err.message });
            })
    }

    //[PUT] /:id
    updateOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('magv', sql.NChar(15), req.params.id) // id=magv
                .input('ho', sql.NVarChar(50), req.body.HO)
                .input('ten', sql.NVarChar(15), req.body.TEN)
                .input('diachi', sql.NVarChar(200), req.body.DIACHI)
                .input('sdt', sql.NChar(12), req.body.SDT)
                .input('makh', sql.NChar(15), req.body.MAKH)
                .query('update GIAOVIEN set HO=@ho, TEN=@ten, DIACHI=@diachi, SDT=@sdt, MAKH=@makh where MAGV=@magv');
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
                else res.status(400).send({ err: err.message });
            })
    }

    //[DELETE] /:id
    deleteOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('magv', sql.NChar(15), req.params.id)
                .query('exec SP_XOAGV_TAIKHOAN @magv')
        })
            .then(result => {
                res.status(200).send({ result: result.rowsAffected[0] });
            }).catch(err => {
                console.log(err)
                if (err.message.includes('FK_BODE_GIAOVIEN')) {
                    res.status(400).send({ err: 'Giáo viên đã soạn câu hỏi thi!' });
                }
                else if (err.message.includes('FK_LOPMONHOC_GIAOVIEN')) {
                    res.status(400).send({ err: 'Giáo viên có dạy lớp môn học!' });
                }
                else if (err.message.includes('FK_LOPMONHOC_GIAOVIEN1')) {
                    res.status(400).send({ err: 'Giáo viên có đăng ký thi!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[GET] /:id/check
    checkFK(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('magv', sql.NChar(15), req.params.id)
                .execute('SP_CHECK_GIAOVIEN')
        })
            .then(result => {
                res.status(200).send({ result: 1 });
            }).catch(err => {
                if (err.message.includes('FK_BODE_GIAOVIEN')) {
                    res.status(400).send({ err: 'Giáo viên đã soạn câu hỏi thi!' });
                }
                else if (err.message.includes('FK_LOPMONHOC_GIAOVIEN')) {
                    res.status(400).send({ err: 'Giáo viên có dạy lớp môn học!' });
                }
                else if (err.message.includes('FK_LOPMONHOC_GIAOVIEN1')) {
                    res.status(400).send({ err: 'Giáo viên có đăng ký thi!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }
}

module.exports = new TeacherController();
