const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// Tell passport to use a new stragey for google login
passport.use(new googleStrategy({

    clientID : '568715524745-82prvao0o1qfnpf1pnniqa58slth1jec.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL : 'https://localhost:8000/users/auth/google/callback',
    },
    function(accessToken,refreshToken,profile,done){

        // Find a User
        User.findOne({email: profile.emails[0],value}).then(function(user,err){
            if(err){
                console.log("Error in Google-Strategy User",err);
                return done(err,false);
            }

            console.log(profile);

            if(user){
                // if found set this user as req.user
                return done(null,user)
            }
            else{
                // if not found create user set this user as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }).then(function(user,err){
                    if(err){
                        console.log("Error in Google-Strategy User",err);
                        return;
                    }
                    else{
                        return done(null,user)
                    }
                });

            }
        });

    })
);