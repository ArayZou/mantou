var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    userSchema;

userSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    meta: {
        createAt : {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

userSchema.pre('save', function(next) {
    var user = this;

    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods = {
    pwdMatch: function(pwd, cbFn) {
        bcrypt.compare(pwd, this.password, function(err, isMatch) {
            if (err) {
                return cbFn(err);
            }
            cbFn(null, isMatch);
        });
    }
};

userSchema.statics = {
    findById: function(id, cbFn) {
        return this.findOne({_id: id}).exec(cbFn);
    }
};

module.exports = userSchema;