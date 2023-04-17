const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')


// Authentication using passport
passport.create(new LocalStrategy({
        usernameField : 'email',
    },
    function(email,password,done){
        // find a user and establish his identity
        User.findOne({email : email}).then(function(user.err){
            if(err){
                console.log("Error in finding User -----> Passport");
                return done(err);
            }
            if(!user || user.password != password){
                console.log("Invalid Username/Password")
                return done(null,false);
            }

            return done(null,user);
        });
    }
));

// serializing the user to decide which key to put into the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user,err){
        if(err){
            console.log("Error in finding User -----> Passport");
            return done(err);
        }

        return done(null,user);
    });
});

module.export = passport;