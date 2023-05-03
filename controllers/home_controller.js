const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function(req,res){

    try{

        // Populate the user of posts
        let posts = await Post.find({}).sort('-createdAt').populate('user').populate({
            path: 'comments',
            populate :{
                path : 'user'
            }
        });
        
        let users = await User.find({});
        
        return res.render('home',{
            title : "Codial | Home",
            posts : posts,
            all_users : users
        });

    } catch(err){
        console.log("Error",err);
    };
   
};

// module.exports.home = function(req,res){
//     // return res.end('<h1> Express is Up for Codeial </h1>')


//     // console.log(req.cookies);
//     // res.cookie('User_id',25);
//     // return res.render('home',{
//     //     title : "Coi=dial | Home"
//     // });

//     // Shows user by id

//     // Post.find({}).then(function(post,err){
//     //     if(err){
//     //         console.log("Error in Fetching Post");
//     //         return;
//     //     }

//     //     return res.render('home',{
//     //         title : "Codial | Home",
//     //         posts : post
//     //     });
//     // });


//     // Populate the User of each post
//     Post.find({})
//     .populate("user")
//     .populate({
//         path : "comments",
//         populate: {
//             path: "user"
//         }
//     })
//     .then(function(post,err){
//         if(err){
//             console.log("Error in Fetching Post");
//             return;
//         }

//         User.find({}).then(function(user,err){
//             if(err){
//                 console.log("Error in Fetching all User to show");
//                 return;
//             }

//             return res.render('home',{
//                 title : "Codial | Home",
//                 posts : post,
//                 all_users : user
//             });
//         });
//     });

// };

// module.exports.actionName = function(req,res){
//     return res.end('<h2> Hello !!</h2>')
// }