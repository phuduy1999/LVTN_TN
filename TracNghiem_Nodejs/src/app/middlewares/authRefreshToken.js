const jwt = require('jsonwebtoken')

function authenticateRefreshToken(req, res, next) {
    const token = req.body.refreshToken;
    if (token === null || token === 'null') return res.sendStatus(401);

    // console.log(token);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user;
        next();
    })
}

module.exports = authenticateRefreshToken;