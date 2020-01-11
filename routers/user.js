const express = require('express');
const User = require('../models/user')
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
     destination: "./public/profileuploads",
     filename: (req, file, callback) => {
         let ext = path.extname(file.originalname);
         callback(null,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      `${file.fieldname}-${Date.now()}${ext}`);
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
 



/*
* register data of user
*/

 router.post("/user/register", (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    var myData = new User(req.body);
    myData.save().then(function(){
        return res.status(200).json({code:200,message:'User register successfully'});
    }).catch(function(e){
    
    if (e.name === 'ValidationError'){
        console.log("email already taken")
         return res.status(500).json({ code:500,message: 'Email is already taken' })

    }else{
        return res.send(e)
    }
    });
});

/*
* register data of admin
*/

router.post("/admin/register",auth.verifyUser,auth.verifyAdmin, (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.isAdmin=true;
    var myData = new User(req.body);
    myData.save().then(function(){
        return res.status(200).json({code:200,message:'Admin register successfully'});
    }).catch(function(e){
    
    if (e.name === 'ValidationError'){
        console.log("email already taken")
         return res.status(500).json({code:500, message: 'Email is already taken' })

    }else{
        return res.send(e)
    }
    });
});


/*
*  upload image in directory of user
*/

router.post("/upload",upload.single('profileimage'), (req, res) => {
    res.json(req.file);
 
});



/*
* verify email and password for login
*/

 router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                let err = new Error('Email not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 400;
                            return next(err);
                        }
                    

                            let token = jwt.sign({ _id: user._id }, process.env.SECRET,{
                                expiresIn: 60 * 60 * 24 // expires in 24 hours
                              });
                            
        
                                const userdetails = {
                                    userId: user._id,
                                    _id: user._id,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    address: user.address,
                                    email: user.email,
                                    isAdmin: user.isAdmin
                                  };
                         res.json({code:100, status: 'Login success!', token: token ,user:userdetails});
                        
                    }).catch(next);
            }
        }).catch(next);
})




/*
* display login user details
*/

router.get('/users/me', auth.verifyUser, (req, res, next) => {
    res.status(200).json({ _id: req.user._id, firstname: req.user.firstname, lastname: req.user.lastname, email: req.user.email, profileimage: req.user.profileimage,
        address: req.user.address,isAdmin: req.user.isAdmin });
});

/*
* display  single user details by id
*/
 
router.get('/user/single/:id', auth.verifyUser, (req,res)=>{

    User.findOne({_id:req.params.id}).then(function(user){
            // console.log(user);
            res.json(user)
            // res.json({code:100,singleuser:user});
    }).catch(function(e){
            res.json(e)
    });
});



/*
* Update user details by id
*/

router.put('/user/update/:id',auth.verifyUser,(req,res)=>{
    console.log(req.body)
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
         res.json({code:100,message:"Succesfully Updated"});

    }).catch(function(e){
         res.send(e)
    });
});

/*
* display  All user details
*/
router.get('/allusers',auth.verifyUser,(req,res)=>{
    User.find().then(function(user){
         res.json({code:100,alluser:user});
    }).catch(function(e){  
            res.send(e)
       
    });
    });








module.exports=router;