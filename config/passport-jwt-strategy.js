const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :'codeial',
}

passport.use( new JWTStrategy(opts,function(jwt_payload,done){
    
    User.findById(jwt_payload._id).then(function(user,error){
        if(err){
            console.log('error in finding user from JWT',err);
            return done(err,false);
        }
        else if(user){
            return done(null,user);
        }
        else{
            return done(null,false)
        }
    });

}));

module.exports = passport;