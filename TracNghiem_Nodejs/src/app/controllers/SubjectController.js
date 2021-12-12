const { sqlConnect, sql } = require('../config/db')

class SubjectController {
    //[GET] /
    getAll(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .query('select * from MONHOC')
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
        const ma = req.params.id;
        sqlConnect.then(pool => {
            return pool.request()
                .input('mamh', sql.NVarChar, ma)
                .query('select * from MONHOC where MAMH=@mamh')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord[0]);
            }).catch(err => {
                console.log(err)
            })
    }

    //[GET] /:name/name
    getOneByName(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('tenmh', sql.NVarChar, req.params.name)
                .query('select * from MONHOC where TENMH=@tenmh')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord[0]);
            }).catch(err => {
                res.status(400).send(err);
            })
    }

    //[POST] /
    addOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .input('tenmh', sql.NVarChar(50), req.body.TENMH)
                .query('insert into MONHOC(MAMH, TENMH) values (@mamh, @tenmh)')
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
                else res.status(400).send({ err: 'Lỗi thêm môn học!' });
            })
    }

    //[PUT] /:id/edit
    updateOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('id', sql.NChar(15), req.params.id)
                .input('mamh', sql.NChar(15), req.body.MAMH)
                .input('tenmh', sql.NVarChar(50), req.body.TENMH)
                .query('update MONHOC set MAMH=@mamh, TENMH=@tenmh where MAMH=@id')
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
                else res.status(400).send({ err: 'Lỗi sửa môn học!' });
            })
    }

    //[DELETE] /:id
    deleteOne(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('mamh', sql.NChar(15), req.params.id)
                .query('delete from MONHOC where MAMH=@mamh')
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send({ result: result.rowsAffected[0] });
            }).catch(err => {
                console.log(err)
                if (err.message.includes('FK_LOPMONHOC_MONHOC')) {
                    res.status(400).send({ err: 'Môn học đã được mở lớp!' });
                }
                else if (err.message.includes('FK_BODE_MONHOC')) {
                    res.status(400).send({ err: 'Môn học đã được soạn câu hỏi thi!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }

    //[GET] /:id/check
    checkFK(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('mamh', sql.NChar(15), req.params.id)
                .execute('SP_CHECK_MONHOC')
        })
            .then(result => {
                res.status(200).send({ result: 1 });
            }).catch(err => {
                console.log(err)
                if (err.message.includes('FK_LOPMONHOC_MONHOC')) {
                    res.status(400).send({ err: 'Môn học đã được mở lớp!' });
                }
                else if (err.message.includes('FK_BODE_MONHOC')) {
                    res.status(400).send({ err: 'Môn học đã được soạn câu hỏi thi!' });
                }
                else res.status(400).send({ err: err.message });
            })
    }
}

module.exports = new SubjectController();
