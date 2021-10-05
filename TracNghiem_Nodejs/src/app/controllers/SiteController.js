const { DateTime } = require('mssql');
const { sqlConnect, sql } = require('../config/db')

class SiteController {
    //[GET] /
    index(req, res) {
        res.json('home');
    }

    //[GET] /result-lenhdat
    resultLenhDat(req, res) {
        res.send('sadas')
    }

    //[GET] /:slug
    show(req, res) {
        res.send('404 not found');
    }

    //[POST] /execsp
    execsp(req, res) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        const mess = {
            err: 'Đặt lệnh thành công! ' + dateTime,
            color: 'green'
        }

        sqlConnect.then(pool => {
            return pool.request()
                .input('macp', sql.NVarChar(7), req.body.macp.toUpperCase().trim())
                .input('Ngay', sql.NVarChar, dateTime)
                .input('LoaiGD', sql.Char, req.body.loaigd)
                .input('soluongMB', sql.Int, req.body.soluong)
                .input('giadatMB', sql.Float, req.body.giadat)
                .query('exec SP_KHOPLENH_LO @macp, @Ngay, @LoaiGD, @soluongMB, @giadatMB')
        })
            .then(result => {
                res.json(mess)
            }).catch(err => {
                mess.err = 'Lỗi đặt lệnh! ' + err;
                mess.color = 'red';
                res.json(mess)
                console.log(err)
            })
    };
}

module.exports = new SiteController();
