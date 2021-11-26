const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class TestingController {
    //[PUT] /
    updateChoice(req, res, next) {
        const schema = Joi.object({
            IDDK: Joi.number()
                .required(),
            STT: Joi.number()
                .required(),
            LUACHONSV: Joi.string()
                .required(),
        })

        const result = schema.validate(req.body);
        if (result.error) {
            res.status(400).send({ err: result.error.details[0].message });
            return;
        }

        sqlConnect.then(pool => {
            return pool.request()
                .input('iddk', sql.Int, req.body.IDDK)
                .input('stt', sql.Int, req.body.STT)
                .input('luachonsv', sql.NVarChar(30), req.body.LUACHONSV)
                .query('update TEMP_CTBT set LUACHONSV=@luachonsv where STT=@stt and IDDK=@iddk');
        })
            .then(result => {
                if (result.rowsAffected[0] === 0) {
                    throw Error('Cập nhật chi tiết bài thi tạm không thành công!');
                }
                res.send(req.body);
            }).catch(err => {
                res.status(400).send({ err: err.message });
            })
    }

    //[PUT] /timer
    updateTimer(req, res, next) {
        const schema = Joi.object({
            IDDK: Joi.number()
                .required(),
            THOIGIANCONLAI_S: Joi.number()
                .required(),
        })

        const result = schema.validate(req.body);
        if (result.error) {
            res.status(400).send({ err: result.error.details[0].message });
            return;
        }

        sqlConnect.then(pool => {
            return pool.request()
                .input('iddk', sql.Int, req.body.IDDK)
                .input('tg', sql.Int, req.body.THOIGIANCONLAI_S)
                .query('update DANGKY set THOIGIANCONLAI_S=@tg where IDDK=@iddk');
        })
            .then(result => {
                if (result.rowsAffected[0] === 0) {
                    throw Error('Cập nhật thời gian thi còn lại không thành công!');
                }
                res.send(req.body);
            }).catch(err => {
                res.status(400).send({ err: err.message });
            })
    }
}

module.exports = new TestingController();
