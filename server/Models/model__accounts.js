import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const schema__accounts = mongoose.Schema({
    role: {
        type: String,
        default: "0" //0:user & 1:participant & 2:admin
    },
    email: {
        type: String,
        unique: 1
    },
    password: {
        type: String,
    },
    creation_date: {
        type: Date,
        default: new Date()
    },
    verified_by_admin: {
        type: String,
        default: "false"
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    },
    organization: {
        name: {
            type: String,
        },
        type: {
            type: String,
        },
        website: {
            type: String,
        },
        logo: {
            type: String,
        },
        address: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        description: {
            type: String,
        },
        representative: {
            first_name: {
                type: String,
            },
            last_name: {
                type: String,
            },
            job_position: {
                type: String,
            },
            phone_number: {
                type: String,
            },
            image: {
                type: String,
            },
        }
    }


});

schema__accounts.pre('save', function (next) {
    var account = this;
    if (account.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(account.password, salt, function (err, hash) {
                if (err) return next(err);
                account.password = hash;
                next();
            });
        });
    } else {
        next();
    }

})

schema__accounts.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
}

schema__accounts.methods.generateToken = function (cb) {
    var account = this;
    var token = jwt.sign(account._id.toHexString(), 'secret');
    account.token = token;
    account.save(function (err, account) {
        if (err) {
            return cb(err);
        }
        else {
            cb(null, account)
        }
    });
}

schema__accounts.statics.findByToken = function (token, cb) {
    var account = this;
    jwt.verify(token, 'secret', function (err, decode) {
        account.findOne({ "_id": decode, "token": token }, function (err, account) {
            if (err) return cb(err);
            cb(null, account);
        })
    })
}

const model__accounts = mongoose.model('accounts', schema__accounts);

export default model__accounts;