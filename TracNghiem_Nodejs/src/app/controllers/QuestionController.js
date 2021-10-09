const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');
const XLSX = require('xlsx');
const _chuanHoaChuoi = require('../../_chuanHoaChuoi')

const readFileExcel = (path) => {
  const wb = XLSX.readFile(path);
  /* Get first worksheet */
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  /* Convert array of arrays */
  const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  return data;
}

const getViTriBatDauNoiDung = (data) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (typeof data[i][j] === 'string') {
        const nd = _chuanHoaChuoi(data[i][j]).toUpperCase();
        if (nd === 'NOIDUNG' || nd === 'NOI DUNG' || nd === 'NỘI DUNG') {
          return {
            isValid: true,
            dong: i,
            cot: j
          }
        }
      }
    }
  }
  return {
    isValid: false,
  }
}

const getListCauHoi = (data, t) => {
  const headers = ['NOIDUNG', 'MALOAICH', 'TRINHDO', 'DAP_AN'];
  const listCauHoi = [];
  //get nội dung câu hỏi
  for (let i = t.dong + 1; i < data.length; i++) {
    if (data[i][t.cot] === '') break;

    let cauhoi = {};
    headers.forEach((h, idx) => {
      cauhoi[h] = _chuanHoaChuoi(data[i][t.cot + idx].toString());
    })
    cauhoi.CAC_LUA_CHON = [];
    if (cauhoi.MALOAICH === 'NLC') {
      let vt = t.cot + headers.length;
      for (let j = vt; j < data[i].length; j++) {
        if (data[i][j] === '') break;

        cauhoi.CAC_LUA_CHON.push({
          STT: String.fromCharCode(65 + j - vt),
          NOIDUNG: _chuanHoaChuoi(data[i][j].toString()),
        })
      }
    }

    listCauHoi.push(cauhoi);
  }

  return listCauHoi;
}

class QuestionController {
  //[GET] /
  getAll(req, res, next) {
    sqlConnect.then(pool => {
      return pool.request()
        .query('select IDCAUHOI, TRINHDO, NOIDUNG, DAP_AN, TENMH, TENLOAICH, GIAOVIEN.MAGV, HO, TEN from BODE, MONHOC, LOAICAUHOI, GIAOVIEN where BODE.MAMH = MONHOC.MAMH and BODE.MALOAICH=LOAICAUHOI.MALOAICH and BODE.MAGV=GIAOVIEN.MAGV order by GIAOVIEN.MAGV')
    })
      .then(result => {
        const arrRecord = result.recordset;
        res.status(200).json(arrRecord);
      }).catch(err => {
        console.log(err)
      })
  }

  //[GET] /:id
  getOne(req, res, next) {
    const ma = req.params.id;
    sqlConnect.then(pool => {
      return pool.request()
        .input('id', sql.NVarChar, ma)
        .query('select * from BODE where IDCAUHOI=@id; select * from LUACHON where IDCAUHOI=@id')
    })
      .then(result => {
        const arrRecord = result.recordsets;
        const outputValue = { ...arrRecord[0][0], LUACHON: arrRecord[1] }
        res.status(200).send(outputValue);
      }).catch(err => {
        console.log(err)
      })
  }

  getOne2(req, res, next) {
    const ma = req.params.id;
    sqlConnect.then(pool => {
      return pool.request()
        .input('id', sql.NVarChar, ma)
        .query('select * from BODE where IDCAUHOI=@id')
    })
      .then(result => {
        const arrRecord = result.recordset;
        res.status(200).send(arrRecord[0]);
      }).catch(err => {
        console.log(err)
      })
  }

  //[GET] /:id
  getMultipleChoice(req, res, next) {
    sqlConnect.then(pool => {
      return pool.request()
        .input('id', sql.Int, req.params.id)
        .query('select * from LUACHON where IDCAUHOI=@id')
    })
      .then(result => {
        const arrRecord = result.recordset;
        res.status(200).send(arrRecord);
      }).catch(err => {
        console.log(err)
      })
  }

  //[POST] /
  addOne(req, res, next) {
    const schema = Joi.object({
      TRINHDO: Joi.string()
        .required(),
      NOIDUNG: Joi.string()
        .required(),
      DAP_AN: Joi.string()
        .max(30)
        .required(),
      MAMH: Joi.string()
        .max(15)
        .required(),
      MALOAICH: Joi.string()
        .max(15)
        .required(),
      MAGV: Joi.string()
        .max(15)
        .required(),
      CAC_LUA_CHON: Joi.array()
        .items(Joi.object({
          STT: Joi.string()
            .max(1)
            .required(),
          NOIDUNG: Joi.string()
            .max(200)
            .required(),
        })),
    })

    const result = schema.validate(req.body);
    if (result.error) {
      res.status(400).send({ err: result.error.details[0].message });
      return;
    }

    // const cacLuaChon = new sql.Table('LuaChonType')
    // cacLuaChon.columns.add('STT', sql.NChar(1));
    // cacLuaChon.columns.add('NOIDUNG', sql.NVarChar(200));
    // req.body.CAC_LUA_CHON.forEach((lc, idx) => {
    //     cacLuaChon.rows.add(String.fromCharCode(65 + idx), lc);
    // })

    const json = JSON.stringify(req.body.CAC_LUA_CHON)

    console.log(json);
    sqlConnect.then(pool => {
      return pool.request()
        .input('td', sql.NChar(1), req.body.TRINHDO)
        .input('noidung', sql.NVarChar(sql.MAX), req.body.NOIDUNG)
        .input('dap_an', sql.NVarChar(30), req.body.DAP_AN)
        .input('mamh', sql.NChar(15), req.body.MAMH)
        .input('malch', sql.NChar(15), req.body.MALOAICH)
        .input('magv', sql.NChar(15), req.body.MAGV)
        .input('cacluachonJson', sql.NVarChar(1000), json)
        .execute('SP_THEM_BODE3')
    })
      .then(result => {
        if (result.rowsAffected[0] === 1) {
          res.send(req.body);
        }
      }).catch(err => {
        console.log(err);
        res.status(400).send({ err: 'Lỗi thêm bộ đề!' });
      })
  }

  //[POST] /excel
  addByExcel(req, res, next) {
    console.log(req.file);

    const data = readFileExcel(req.file.path);

    const t = getViTriBatDauNoiDung(data);
    if (!t.isValid) {
      res.status(400).send({ err: "File excel không hợp lệ!" });
    }

    const listCauHoi = getListCauHoi(data, t);
    if (listCauHoi.length === 0) {
      res.status(400).send({ err: "File excel không có câu hỏi!" });
    }

    const cacCauHoi = new sql.Table('CauHoiType')
    cacCauHoi.columns.add('IDX', sql.Int);
    cacCauHoi.columns.add('TRINHDO', sql.NChar(1));
    cacCauHoi.columns.add('NOIDUNG', sql.NVarChar(sql.MAX));
    cacCauHoi.columns.add('DAP_AN', sql.NVarChar(30));
    cacCauHoi.columns.add('MALOAICH', sql.NChar(15));

    const cacLuaChon = new sql.Table('LuaChonType')
    cacLuaChon.columns.add('IDX', sql.Int);
    cacLuaChon.columns.add('STT', sql.NChar(1));
    cacLuaChon.columns.add('NOIDUNG', sql.NVarChar(200));

    listCauHoi.forEach((ch, idx) => {
      cacCauHoi.rows.add(idx + 1, ch.TRINHDO, ch.NOIDUNG, ch.DAP_AN, ch.MALOAICH);
      if (ch.MALOAICH.trim() === 'NLC') {
        ch.CAC_LUA_CHON.forEach(lc => {
          cacLuaChon.rows.add(idx + 1, lc.STT, lc.NOIDUNG);
        })
      }
    })

    sqlConnect.then(pool => {
      return pool.request()
        .input('caccauhoi', sql.TVP, cacCauHoi)
        .input('cacluachon', sql.TVP, cacLuaChon)
        .input('mamh', sql.NChar(15), req.body.MAMH)
        .input('magv', sql.NChar(15), req.body.MAGV)
        .execute('SP_THEM_BODE_EXCEL')
    })
      .then(result => {
        res.status(200).send(result);
      }).catch(err => {
        console.log(err);
        if (err.message.includes('mhktt')) {
          res.status(400).send({ err: 'Môn học không tồn tại!' });
        }
        else res.status(400).send({ err: err.message });
      })
  }

  //[POST] /:id/edit
  updateOne(req, res, next) {
    const schema = Joi.object({
      TRINHDO: Joi.string()
        .required(),
      NOIDUNG: Joi.string()
        .required(),
      DAP_AN: Joi.string()
        .max(30)
        .required(),
      MAMH: Joi.string()
        .max(15)
        .required(),
      MAGV: Joi.string()
        .max(15)
        .required(),
      CAC_LUA_CHON: Joi.array()
        .items(Joi.object({
          STT: Joi.string()
            .max(1)
            .required(),
          NOIDUNG: Joi.string()
            .max(200)
            .required(),
        })),
    })

    const result = schema.validate(req.body);
    if (result.error) {
      res.status(400).send({ err: result.error.details[0].message });
      return;
    }

    const json = JSON.stringify(req.body.CAC_LUA_CHON);

    sqlConnect.then(pool => {
      return pool.request()
        .input('td', sql.NChar(1), req.body.TRINHDO)
        .input('noidung', sql.NVarChar(sql.MAX), req.body.NOIDUNG)
        .input('dap_an', sql.NVarChar(30), req.body.DAP_AN)
        .input('mamh', sql.NChar(15), req.body.MAMH)
        .input('magv', sql.NChar(15), req.body.MAGV)
        .input('idch', sql.Int, req.params.id)
        .input('cacluachonJson', sql.NVarChar(1000), json)
        .execute('SP_SUA_BODE2')
    })
      .then(result => {
        if (result.rowsAffected[0] === 1) {
          res.send(req.body);
        }
      }).catch(err => {
        res.status(400).send({ err: 'Lỗi thêm bộ đề!' });
      })
  }

  //[DELETE] /:id
  deleteOne(req, res) {
    sqlConnect.then(pool => {
      return pool.request()
        .input('idch', sql.Int, req.params.id)
        .execute('SP_XOA_BODE')
    })
      .then(result => {
        const arrRecord = result.recordset;
        res.status(200).send({ result: result.rowsAffected[0] });
      }).catch(err => {
        console.log(err)
        if (err.message.includes('FK_CTBT_BODE')) {
          res.status(400).send({ err: 'Câu hỏi đã được thi!' });
        }
        else res.status(400).send({ err: err.message });
      })
  }
}

module.exports = new QuestionController();
