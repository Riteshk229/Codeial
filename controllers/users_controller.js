const User = require('../models/user')

module.exports.profile = function(req,res){
    // return res.end('<h1> User Profile </h1>');

    return res.render('users_profile',{
        title: "Profile"
    });
};

module.exports.post = function(req,res){
    // return res.end('<h1> User Posts </h1>')

    return res.render('users_post',{
        title: "Post"
    });
};


// render sign up page
module.exports.signUp = function(req,res){
    // its makes so that user can acess sign-in page again
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('User_sign_up',{
        title : 'Codial | Sign Up'
    });
};

//render sign in page
module.exports.signIn = function(req,res){
    // its makes so that user can acess sign-in page again
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('User_sign_In',{
        title : 'Codial | Sign In'
    });
};

// get signup data
module.exports.create = function(req,res){
    console.log(`${req.body} in create`);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}).then(function(user,err){
        if(err){
            console.log("Error in finding user in signing up");
            return;
        }


        if(!user){
            User.create(req.body).then(function(user,err){
                if(err){
                    console.log("Error in creating user while signing up");
                    return ;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });

};

// Signin and create session for user
module.exports.createSession = function(req,res){
    // console.log(`${req.body} in create`);
    return res.redirect('/');
};

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
};