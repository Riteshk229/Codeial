const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')


// Authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
        passReqToCallback: true
    },
    function(req,email,password,done){
        // find a user and establish his identity
        User.findOne({email : email}).then(function(user,err){
            if(err){
               req.flash("error",err);
                return done(err);
            }
            if(!user || user.password != password){
               req.flash("error","Invalid Username/Password")
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

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // console.log("Inside CheckAuthentication");
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
};


passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){
        // req.user conatins the current signed in user from the
        // session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    return next();
};

module.export = passport;