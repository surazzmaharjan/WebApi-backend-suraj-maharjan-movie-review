const express = require('express');
const Movie = require('../models/movie')
const Favourite = require('../models/favourite')
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require("path");
const router = new express.Router()
const bcrypt = require('bcrypt');



router.post('/favourite',auth.verifyUser, (req, res) => {

    console.log(req.body)
    var myData = new Favourite(req.body);
    myData.save().then(function(){
        return res.status(200).json({code:200,message:'Added in favourite'});
    }).catch(function(e){
        return res.json({ message: e })

    });
});

router.get('/favourite',auth.verifyUser, (req, res, next) => {
    Favourite.find().then(function(favourite){
        res.json(favourite);

    }).catch(function(e){

            res.json(e)

    });
});


router.delete('/favourite/:id',auth.verifyUser,(req,res)=>{

    Favourite.findByIdAndDelete(req.params.id).then(function(){
                res.status(200).json({code:200,message:"Succesfully deleted from favourite"});
            }).catch(function(e){
                res.send(e)
            });
        });

module.exports=router;
