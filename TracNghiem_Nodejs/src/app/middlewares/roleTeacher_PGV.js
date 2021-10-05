function roleTeacher_PGV(req, res, next) {
    // console.log(req.user);
    if (req.user.MANQ.trim() === 'PGV') {
        next();
    }
    else {
        res.status(403).send({
            message: "Require PGV Role!"
        });
    }
}

module.exports = roleTeacher_PGV;