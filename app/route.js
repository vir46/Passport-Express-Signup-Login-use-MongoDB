module.exports = function(app,passport) {

    // Home Route
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // Login Route
    app.get('/login', function(req, res) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // Process Login
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // Logout Route
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    
    // Signup Route
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });
    
    // Process Signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    // Profile Route
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

};

function isLoggedIn(req, res, next) {
    if(req.user) return next();
    res.redirect('/');
}