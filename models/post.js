const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const postSchema = new moongoose.Schema({

    content: {
        type : String,
        required : true
    },

    user:{
        type : moongoose.Schema.Types.ObjectId,
        ref : "user"
    }
   
},{
    timestamps: true
});

const Post = mongoose.model("Post",postSchema);

module.exports = Post;