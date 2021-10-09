require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./app/middlewares/auth')
const roleTeacher = require('./app/middlewares/roleTeacher')
const roleStudent = require('./app/middlewares/roleStudent')

const { sqlConnect, sql } = require('./app/config/db') //ket noi db

const app = express();
const port = 4000;

var cors = require('cors')

//midleware xu ly parse body(npm body parse)
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(cors())

const catchError = (err, res) => {
    if (err instanceof jwt.TokenExpiredError) {
        return res.status(403).send({ message: "Refresh token was expired. Please make a new signin request" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const generateTokens = payload => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.jwt_access_expiration,
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.jwt_refresh_expiration,
    });

    return { accessToken, refreshToken };
}

const updateRefreshToken = (email, refreshToken) => {
    sqlConnect.then(pool => {
        return pool.request()
            .input('email', sql.NChar(50), email)
            .input('refresh_token', sql.NVarChar, refreshToken)
            .query('update TAIKHOAN set REFRESH_TOKEN=@refresh_token where EMAIL=@email');
    })
        .then(result => {
            // console.log(result);
        }).catch(err => {
            console.log(err);
        })
}

app.post('/api/login', (req, res) => {
    sqlConnect.then(pool => {
        return pool.request()
            .input('email', sql.NChar(50), req.body.EMAIL)
            .input('password', sql.NVarChar(50), req.body.PASSWORD)
            .execute('SP_LOGIN')
    })
        .then(result => {
            const arrRecord = result.recordset;

            const tokens = generateTokens(arrRecord[0]);

            return tokens;
        })
        .then(tokens => {
            updateRefreshToken(req.body.EMAIL, tokens.refreshToken);

            res.json(tokens);
        })
        .catch(err => {
            res.sendStatus(401);
        })
})

app.post('/api/refreshToken', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(403).json({ message: "Refresh Token is required!" });

    sqlConnect.then(pool => {
        return pool.request()
            .input('refresh_token', sql.NVarChar(sql.MAX), refreshToken)
            .query('select EMAIL, MANQ from TAIKHOAN where REFRESH_TOKEN=@refresh_token');
    })
        .then(result => {
            const arrRecord = result.recordset;

            if (arrRecord[0] === undefined) {
                throw Error('fail')
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
                if (err) {
                    updateRefreshToken(arrRecord[0].EMAIL, null);
                    return catchError(err, res);
                }
                const newUser = {
                    EMAIL: data.EMAIL,
                    MANQ: data.MANQ
                }
                if (data.MASV) {
                    newUser.MASV = data.MASV;
                } else {
                    newUser.MAGV = data.MAGV;
                }
                const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.jwt_access_expiration
                })
                res.json({ accessToken, refreshToken })
            })
        }).catch(err => {
            console.log(err);
            res.status(403).send({ message: "Refresh token is not in database!" });
        })

})

app.post('/api/logout', authenticateToken, (req, res) => {
    sqlConnect.then(pool => {
        return pool.request()
            .input('refresh_token', sql.NVarChar, null)
            .input('refreshToken', sql.NVarChar, req.body.refreshToken)
            .query('update TAIKHOAN set REFRESH_TOKEN=@refresh_token where REFRESH_TOKEN=@refreshToken');
    })
        .then(result => {
            res.sendStatus(204);
        }).catch(err => {
            console.log(err);
        })
})

app.post('/api/change-password-teacher', authenticateToken, roleTeacher, (req, res) => {
    sqlConnect.then(pool => {
        return pool.request()
            .input('email', sql.NChar(50), req.body.EMAIL)
            .input('password', sql.NVarChar(50), req.body.PASSWORD)
            .input('password_new', sql.NVarChar(50), req.body.PASSWORD_NEW)
            .query('exec SP_DOIMATKHAU_GV @email, @password, @password_new');
    })
        .then(result => {
            res.send(204);
        }).catch(err => {
            console.log(err);
            if (err.message.includes('mkcusai')) {
                res.status(400).send({ err: 'Mật khẩu cũ không chính xác!' });
            }
            else res.status(400).send({ err: err.message });
        })
})

app.post('/api/change-password-student', authenticateToken, roleStudent, (req, res) => {
    sqlConnect.then(pool => {
        return pool.request()
            .input('email', sql.NChar(50), req.body.EMAIL)
            .input('password', sql.NVarChar(50), req.body.PASSWORD)
            .input('password_new', sql.NVarChar(50), req.body.PASSWORD_NEW)
            .query('exec SP_DOIMATKHAU_SV @email, @password, @password_new');
    })
        .then(result => {
            res.send(204);
        }).catch(err => {
            console.log(err);
            if (err.message.includes('mkcusai')) {
                res.status(400).send({ err: 'Mật khẩu cũ không chính xác!' });
            }
            else res.status(400).send({ err: err.message });
        })
})

app.listen(port, () => {
    console.log(`App auth server listening at http://localhost:${port}`);
});
