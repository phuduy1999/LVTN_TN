const { sqlConnect, sql } = require('../config/db')

class RegisterClassController {
    //[GET] /:id
    getClasses(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .input('masv', sql.NChar(15), req.params.id)
                .query('select * from LOPMONHOC, MONHOC where LOPMONHOC.MAMH=MONHOC.MAMH and IDLMH in (select IDLMH from DANGKY where MASV=@masv) and TRANGTHAI=1 order by NGAYTHI desc');
        })
            .then(result => {
                const arrRecord = result.recordset;
                res.status(200).send(arrRecord);
            }).catch(err => {
                console.log(err)
            })
    }

    //[POST] /
    addRegisterClass(req, res) {
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
                    res.status(400).send({ err: 'Không tồn tại thông tin lớp môn học hoặc lớp môn học đã bị hủy!' });
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
