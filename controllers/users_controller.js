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
    return res.render('User_sign_up',{
        title : 'Codial | sign up'
    });
};

//render sign in page
module.exports.signIn = function(req,res){
    return res.render('User_sign_In',{
        title : 'Codial | sign In'
    });
};