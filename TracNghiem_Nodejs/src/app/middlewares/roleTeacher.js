function roleTeacher(req, res, next) {
    // console.log(req.user);
    if (req.user.MANQ.trim() === 'PGV' || req.user.MANQ.trim() === 'GV' || req.user.MANQ.trim() === 'admin') {
        next();
    }
    else {
        res.status(403).send({
            message: "Require GV||PGV Role!"
        });
    }
}

module.exports = roleTeacher;