var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

// Note:
// Done is used for callback
// PassReqToCallback is used for passing req to callback
// req is used for getting data from request
// req.flash is used for flash message

module.exports = function(passport) {

    // Serialize user for session
    // Serialize used for saving user in session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize user for session
    // Deserialize used for getting user from session
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, function(req, email, password, done) {
        console.log("Hello;")
        process.nextTick(function(){
            User.findOne({'local.email': email}, function(err, user){
                if(err) return done(err);
                if(user){
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                }else{
                    var NewUser = new User();
                    NewUser.local.email = email;
                    NewUser.local.password = NewUser.hashPassword(password);
                    NewUser.save(function(err){
                        if(err) throw err;
                        return done(null, NewUser);
                    });
                }
            })
        });        
    }));

    // Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, function(req, email, password, done) {
        User.findOne({'local.email': email}, function(err, user){
            if(err) return done(err);
            if(!user){
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if(!user.checkPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Wrong password.'));
            }
            return done(null, user);
        });
    }));
};