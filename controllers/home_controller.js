module.exports.home = function(req,res){
    // return res.end('<h1> Express is Up for Codeial </h1>')
    

    // console.log(req.cookies);
    // res.cookie('User_id',25);
    return res.render('home',{
        title : "Home"
    });
};

// module.exports.actionName = function(req,res){
//     return res.end('<h2> Hello !!</h2>')
// }