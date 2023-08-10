

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('success', 'You Need To Login First');
        return res.redirect('/login');
    }
    next();
}

module.exports = {
    isLoggedIn
}