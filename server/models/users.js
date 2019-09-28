var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'CMSDeveloper';

var userSchema = new Schema({
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

userSchema.methods.comparePassword =function (plainPassword ,done)  {
    
    bcrypt.compare(plainPassword, this.password).then((res)=> {
        done(res);
    }).catch((err)=>{
        console.log(err);
        
    })
}

userSchema.methods.generateToken = function () {
    let user = this;
    delete user.password;
    console.log('this user email> ',user.email);
    
    let token = jwt.sign({email:user.email},secret);
    console.log(token);
    return token;
    
}

userSchema.statics.decodeToken = function(token)  {
    return jwt.verify(token,secret);
}




module.exports = mongoose.model('users', userSchema);
