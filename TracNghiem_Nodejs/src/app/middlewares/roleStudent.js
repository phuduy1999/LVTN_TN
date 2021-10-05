function roleStudent(req, res, next) {
    // console.log(req.user);
    if (req.user.MANQ.trim() === 'SV') {
        next();
    }
    else {
        res.status(403).send({
            message: "Require SV Role!"
        });
    }
}

module.exports = roleStudent;