var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'CMSDeveloper';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
});
userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) return next(err)
        user.password = hash;
        user.token = user.generateToken();
        next()
    });
});

userSchema.methods.comparePassword = (plainPassword,password, done) => {
    
    console.log(this);
    
    bcrypt.compare(plainPassword, password).then((res)=> {
        done(res);
    }).catch((err)=> {
        console.log(err);
        
    })
}

userSchema.methods.generateToken = ()=> {
    let user = this;
    delete user.password;
    let token = jwt.sign({email:user.email},secret);
    console.log(token);
    return token;
    
}

userSchema.statics.decodeToken = (token) => {
    return jwt.verify(token,secret);
}




module.exports = mongoose.model('users', userSchema);
