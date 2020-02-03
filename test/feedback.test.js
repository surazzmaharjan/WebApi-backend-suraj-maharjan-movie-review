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

    
    // select all feedback
        it('to test the select feedback is working or not', async () => {
            const status = await Comment.find({});
            expect(status.length).toBeGreaterThan(0);
        })

        //to update user details by id
    it('to test feedback the update', async () => {

        return Comment.findOneAndUpdate({_id :Object('5e422403ab59a116d3164e37')}, {$set : {feedback:"updated fedback"}})
        .then((pp)=>{
            expect(pp.feedback).toEqual("updated fedback")
        })

    });

    // delete feedback user by id
     it('to test the delete feedback is working or not', async () => {
         const status = await Comment.deleteOne({_id :Object('5e422403ab59a116d3164e37')});
         expect(status.ok).toBe(1);
     })
})