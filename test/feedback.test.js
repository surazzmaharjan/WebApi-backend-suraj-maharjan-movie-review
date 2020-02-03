// use the path of your model
const Comment = require('../models/comment');
const mongoose = require('mongoose');

const axios = require('axios');

const baseurl = 'http://localhost:3000/';

// use the new name of the database
const url = 'mongodb://localhost:27017/testing_movie_review'; 
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});


describe('Feedback Schema', () => {
    let comments;
         it('Give a feedbak', () => {
            const comment = {
                'movieid': '5e4222b3da12681603be7ed4',
                'movietitle': 'Thor',
                'rating': 4,
                'feedback': 'great movie',
                'authorid': '5e391a4dd22f2a28a1c6e1e4',
                'authorfirstname': 'testcase'
            };
            
            return Comment.create(comment)
                .then((pro_ret) => {
                    expect(pro_ret.movietitle).toEqual('Thor');
                });
        });

    
  
})