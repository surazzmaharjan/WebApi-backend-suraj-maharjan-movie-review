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




router.get('/comment/:id',auth.verifyUser,(req,res)=>{

    Comment.findOne({_id:req.params.id}).then(function(comment){
            console.log(comment);
            res.json(comment);
    }).catch(function(e){
            res.json(e)
    });
});

router.put('/comment/:id',auth.verifyUser,(req,res)=>{
    console.log(req.body);
    Comment.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
         console.log(res);
         res.status(200).json({code:200,message:"Comment succesfully updated"});

    }).catch(function(e){
         res.send(e)
    });
});



router.get('/comment',auth.verifyUser, (req, res, next) => {
    Comment.find().then(function(comment){
        res.json(comment);

    }).catch(function(e){

            res.json(e)

    });
    });




router.delete('/comment/:id',auth.verifyUser,(req,res)=>{

    Comment.findByIdAndDelete(req.params.id).then(function(){
                res.status(200).json({code:200,message:"Succesfully deleted"});
            }).catch(function(e){
                res.send(e)
            });
        });


module.exports=router;
