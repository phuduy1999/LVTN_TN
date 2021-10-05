function roleTeacher_GV(req, res, next) {
    // console.log(req.user);
    if (req.user.MANQ.trim() === 'GV') {
        next();
    }
    else {
        res.status(403).send({
            message: "Require GV Role!"
        });
    }
}

module.exports = roleTeacher_GV;