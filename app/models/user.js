var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Schema user
var UserSchema = new mongoose.Schema({
    local : {
        email: String,
        password: String,
    }
});

// User methods

// Password Hashing
UserSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Password Validation
UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);