module.exports = (req, res, next) => {
    if(req.cookies.userEcomer && !req.session.user) {
        req.session.user = req.cookies.userEcomer;
        res.locals.user = req.session.user;
    }
    next();
}