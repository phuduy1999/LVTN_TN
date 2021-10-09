function roleAdmin(req, res, next) {
    // console.log(req.user);
    if (req.user.MANQ.trim() === 'admin') {
        next();
    }
    else {
        res.status(403).send({
            message: "Require Admin Role!"
        });
    }
}

module.exports = roleAdmin;