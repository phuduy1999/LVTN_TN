const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null || token === 'null') return res.sendStatus(401);

    // console.log(token);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user;
        next();
    })
}

const catchError = (err, res) => {
    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

function authenticateToken2(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) return res.status(403).send({ message: "No token provided!" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return catchError(err, res);
        req.user = user;
        next();
    })
}

module.exports = authenticateToken2;