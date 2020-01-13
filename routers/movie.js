  
  const express = require('express');
  const fs = require('fs');
  const Movie = require('../models/movie')
  const auth = require('../middleware/auth');
  const jwt = require('jsonwebtoken');
  const multer = require('multer');
  const path = require("path");
  const router = new express.Router()
  const bcrypt = require('bcrypt');




/*
* to upload image in uploads directory
*/

 const storage = multer.diskStorage({
    destination: "./public/movie/uploads",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
 
 const imageFileFilter = (req, file, cb) => {
     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
         return cb(new Error("You can upload only image files!"), false);
     }
     cb(null, true);
 };
 
 const upload = multer({
     storage: storage,
     fileFilter: imageFileFilter
 })
  

 router.post('/movie',auth.verifyUser,auth.verifyAdmin,upload.single('mimage'),  (req, res) => {
   
     req.body.mimage = req.file.filename;
   
    console.log(req.body)
    var myData = new Movie(req.body);
    myData.save().then(function(){
        return res.status(200).json({code:200,message:'Movie added successfully'});
    }).catch(function(e){
    
    if (e.name === 'ValidationError'){
         return res.status(500).json({ code:500,message: 'Movie title is already taken' })

    }else{
        return res.send(e)
    }
    });
});



module.exports=router;