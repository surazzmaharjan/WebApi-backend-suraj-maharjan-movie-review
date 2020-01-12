const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const movieSchema = mongoose.Schema({
        title: 
        {
            type: String,
            unique: true,
            required:true
        },

        mimage: String,
        description:String,
        year:String,
        genre:String,
        newrelease:{
            type:Boolean,
            default:false
        },
        rating: {
            type:Number,
            default:0
        },
        created: {type: Date, default: Date.now()},
        review: String,
        comments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
            ]
    });

movieSchema.plugin(uniqueValidator);
const User = mongoose.model('Movie',movieSchema);
module.exports = User;

