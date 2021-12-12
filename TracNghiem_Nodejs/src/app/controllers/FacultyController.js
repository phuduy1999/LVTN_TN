const { sqlConnect, sql } = require('../config/db')

class FacultyController {
  //[GET] /
  getAll(req, res) {
    sqlConnect.then(pool => {
      return pool.request()
        .query('select * from KHOA')
    })
      .then(result => {
        const arrRecord = result.recordset;
        res.status(200).json(arrRecord);
      }).catch(err => {
        console.log(err)
      })
  }

  //[GET] /:id
  getOne(req, res) {
    sqlConnect.then(pool => {
      return pool.request()
        .input('makh', sql.NVarChar, req.params.id)
        .query('select * from KHOA where MAKH=@makh')
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
        .input('makh', sql.NChar(15), req.body.MAKH)
        .input('tenkh', sql.NVarChar(50), req.body.TENKH)
        .query('insert into KHOA(MAKH, TENKH) values (@makh, @tenkh)')
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
        else res.status(400).send({ err: 'Lỗi thêm khoa!' });
      })
  }

  //[PUT] /:id
  updateOne(req, res) {
    sqlConnect.then(pool => {
      return pool.request()
        .input('id', sql.NChar(15), req.params.id)
        .input('makh', sql.NChar(15), req.body.MAKH)
        .input('tenkh', sql.NVarChar(50), req.body.TENKH)
        .query('update KHOA set MAKH=@makh, TENKH=@TENKH where MAKH=@id')
    })
      .then(result => {
        if (result.rowsAffected[0] === 1) {
          res.send(req.body);
        }
      }).catch(err => {
        console.log(err)
        if (err.message.includes('PRIMARY KEY')) {
          res.status(400).send({ err: 'Trùng khóa chính!' });
        }
        else if (err.message.includes('UNIQUE KEY')) {
          res.status(400).send({ err: 'Trùng khóa duy nhất!' });
        }
        else res.status(400).send({ err: 'Lỗi sửa khoa!' });
      })
  }

  //[DELETE] /:id
  deleteOne(req, res) {
    sqlConnect.then(pool => {
      return pool.request()
        .input('makh', sql.NChar(15), req.params.id)
        .query('delete from KHOA where MAKH=@makh')
    })
      .then(result => {
        res.status(200).send({ result: result.rowsAffected[0] });
      }).catch(err => {
        console.log(err)
        if (err.message.includes('FK_GIAOVIEN_KHOA')) {
          res.status(400).send({ err: 'Khoa đã có giáo viên!' });
        }
        else if (err.message.includes('FK_LOPMONHOC_KHOA')) {
          res.status(400).send({ err: 'Khoa đã có lớp môn học!' });
        }
        else res.status(400).send({ err: err.message });
      })
  }

  //[GET] /:id/check
  checkFK(req, res) {
    sqlConnect.then(pool => {
      return pool.request()
        .input('makh', sql.NChar(15), req.params.id)
        .execute('SP_CHECK_KHOA')
    })
      .then(result => {
        res.status(200).send({ result: 1 });
      }).catch(err => {
        console.log(err)
        if (err.message.includes('FK_GIAOVIEN_KHOA')) {
          res.status(400).send({ err: 'Khoa đã có giáo viên!' });
        }
        else if (err.message.includes('FK_LOPMONHOC_KHOA')) {
          res.status(400).send({ err: 'Khoa đã có lớp môn học!' });
        }
        else res.status(400).send({ err: err.message });
      })
  }
}

module.exports = new FacultyController();
