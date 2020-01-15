var mongoose = require("mongoose");


var favouritelistSchema = new mongoose.Schema({
    movieid: {
        type: String,
        required:true
    },

    moviename: {
        type: String,
        required:true
    },
    movieyear: {
        type: String,
        required:true
    },

    moviegenre: {
        type: String,
        required:true
    },
    currentid:{
        type: String,
        required:true
    },
    currentuser:{
        type: String,
        required:true
    }

});

module.exports = mongoose.model('Favourite', favouritelistSchema);