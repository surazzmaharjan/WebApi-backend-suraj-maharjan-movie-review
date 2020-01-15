var mongoose = require("mongoose");


var commentSchema = new mongoose.Schema({
    feedback: String,
    movieid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie"
    },
    movietitle: String,
    rating:{
        type:Number,
        default:0
    },
    authorid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    authorfirstname: String
    
});

module.exports = mongoose.model('Comment', commentSchema);