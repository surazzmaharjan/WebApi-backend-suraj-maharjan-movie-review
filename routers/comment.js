const express = require('express');
const Movie = require('../models/movie')
const Comment = require('../models/comment')
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require("path");
const router = new express.Router()
const bcrypt = require('bcrypt');


router.post('/comment',auth.verifyUser, (req, res) => {
  console.log(req.body)
    var myData = new Comment(req.body);
    myData.save().then(function(){
        return res.status(200).json({code:200,message:'Comment added successfully'});
    }).catch(function(e){


        return res.json({ message: e })

    });
});



module.exports=router;
