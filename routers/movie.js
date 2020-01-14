  
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



router.get('/movie',auth.verifyUser,(req,res)=>{
    Movie.find().then(function(movie){
         res.json(movie);
    }).catch(function(e){

            res.json(e)

    });
    });


router.get('/homepage/viewallmovies',(req,res)=>{
    Movie.find().then(function(movie){
            res.json({code:200,movielists:movie});
    }).catch(function(e){

            res.json(e)

    });
    });



router.delete('/movie/:id',auth.verifyUser,auth.verifyAdmin,(req,res)=>{


    Movie.findOne({_id:req.params.id}).then(function(found){
        const filedes= "./public/movie/uploads/"+found.mimage;
        fs.unlink(filedes, function (err) {
            if (err) {
                console.log(err);
            }else{
                Movie.findByIdAndDelete(found.id).then(function(){
                    res.status(200).json({code:200,message:"Movie deleted Successfully"});

                }).catch(function(e){
                    res.status(402).json({code:402,message:"Movie Could not be deleted."});
                });
            }
        });
    }).catch(function(e){
        res.send(e)
    });



});



router.get('/movie/:id',auth.verifyUser,auth.verifyAdmin,(req,res)=>{

    Movie.findOne({_id:req.params.id}).then(function(movie){
            console.log(movie);
            res.json({code:200,singlemovie:movie});
    }).catch(function(e){
            res.json(e)
    });
});


router.put('/movie/:id',auth.verifyUser,auth.verifyAdmin,(req,res)=>{
    Movie.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
         console.log(res);
         res.status(200).json({code:200,message:"Succesfully movie updated"});

    }).catch(function(e){

        if (e.name === 'ValidationError'){
             return res.status(500).json({ code:500,message: 'Movie title is already taken' })

        }else{
            return res.send(e)
        }
        });
});

module.exports=router;