var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({    
    name    : String,
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, select: false}
});

UserSchema.pre('save', function (next) {
    var user = this;

    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if( err) return next();
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

UserSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

UserSchema.statics.upsertFbUser = function (accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
        'username': profile.emails[0].value
    }, function (err, user) {
        if (!user) {
            var newUser = new that({
                name: profile.displayName,
                username: profile.emails[0].value,
            });
            newUser.save(function (error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

module.exports = mongoose.model('Admin' , UserSchema);