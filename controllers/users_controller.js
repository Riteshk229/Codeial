const User = require('../models/user')
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req,res){
    // return res.end('<h1> User Profile </h1>');
    
    // console.log(req.params.id);
    User.findById(req.params.id).then(function(user,err){
        if(err){
            console.log("Error is fetcching user's profile");
            return;
        }
        
        return res.render('users_profile',{
            title: "Profile",
            profile_user: user
        });
    });
};

module.exports.update = async function(req,res){
    
    // console.log(req.params.id,req.user.id);
    
    if(req.user.id == req.params.id){
        try{
            console.log(1);
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){ return console.log('***Multer Error',err)}
                
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                
                // console.log(user.name,user.email);
                
                if(req.file){
                    console.log(req.file);
                    
                    let root = path.join(__dirname,"..",user.avatar);
                    console.log(root);
                    if(user.avatar && fs.existsSync(root)){
                        
                        fs.unlinkSync(root);
                        
                        // saving the path of the uloaded file into the avatar field in the user
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                        // console.log(user.avatar + "in unlink");
                        
                    }
                    else{
                        // saving the path of the uloaded file into the avatar field in the user
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                        // console.log(user.avatar);
                    }
                    
                    // user.avatar = User.avatarPath + '/' + req.file.filename;
                    // console.log(user.avatar);
                }
                
                user.save();
                return res.redirect('back');
                
            });
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
            
        }
    } else{
        req.flash('error', 'Unauthorized')
        return res.status(401).send("Unauthorized")
    }
    
    
    
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,
    //         {
    //         name : req.body.name,
    //         email : req.body.email
    //         }
    //     ).then(function(user,err){
    //         if(err){
    //             console.log("Error in updating the users");
    //             return;
    //         }
    //         req.flash("success","Updated!!")
    //         return res.redirect("back");
    //     });
    // }
    // else {
    //     return res.status(401).send("Unauthorized")
    // }
};

// module.exports.post = function(req,res){
//     // return res.end('<h1> User Posts </h1>')

//     return res.render('users_post',{
//         title: "Post"
//     });
// };


// render sign up page
module.exports.signUp = function(req,res){
    // its makes so that user can't access sign-up page again
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('User_sign_up',{
        title : 'Codial | Sign Up'
    });
};

//render sign in page
module.exports.signIn = function(req,res){
    
    // its makes so that user can't access sign-in page again
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
        req.flash("error",'Please enter the same password in confirm password')
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
                req.flash("success","Account Created")
                return res.redirect('/users/sign-in');
            });
        }
        else{
            req.flash("error",err)
            return res.redirect('back');
        }
    });
    
};

// Signin and create session for user
module.exports.createSession = function(req,res){
    
    req.flash("success","Logged in Succesfully!");
    
    // console.log(`${req.body} in create`);
    return res.redirect('/');
};

module.exports.destroySession = function(req,res){
    
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success","You have Logged Out!");
        res.redirect('/');
    });
};