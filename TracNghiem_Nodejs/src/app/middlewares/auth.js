const jwt = require('jsonwebtoken')

const catchError = (err, res) => {
    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

function authenticateToken(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) return res.status(403).send({ message: "No token provided!" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return catchError(err, res);
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;