const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    },
    address: {
        type: String
        },
    email: {
        type: String,
        unique: true,
        required:true
        },
    password: {
        type: String,
        required:true
        },

    profileimage:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }   
   
    });

userSchema.plugin(uniqueValidator);
const User = mongoose.model('User',userSchema);
module.exports = User;

