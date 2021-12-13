const { sqlConnect, sql } = require('../config/db')
const Joi = require('joi');

class OptionController {

    //[GET] /:id
    getOptionsOfQuestion(req, res) {
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
}

module.exports = new OptionController();
