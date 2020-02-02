// use the path of your model
const User = require('../models/user');
const mongoose = require('mongoose');

 

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


describe('User Schema testing', () => {
    // the code below is for insert testing
        it('Register User testing', () => {
            const user = {
                'firstname': 'Suman',
                'lastname': 'Shresta',
                'address': 'Kathmandu',
                'email': 'suman@gmail.com',
                'password': '1234'
            };
            
            return User.create(user)
                .then((pro_ret) => {
                    expect(pro_ret.email).toEqual('suman@gmail.com');
                });
        });


    // delete individual user by id
         it('to test the delete user is working or not', async () => {
             const status = await User.deleteOne({_id :Object('5e3914a30a53a9246c10e092')});
             expect(status.ok).toBe(1);
         })


        //delete all user
         it('to test the delete user is working or not', async () => {
             const status = await User.deleteMany();
             expect(status.ok).toBe(1);
         })


    //to update user details by id
     it('to test user the update', async () => {

         return User.findOneAndUpdate({_id :Object('5e39136ac2e5682355bb1d99')}, {$set : {firstname:'moviereview'}})
         .then((pp)=>{
             expect(pp.firstname).toEqual('moviereview')
         })

     });

     // select all user
     it('to test the select user is working or not', async () => {
        const status = await User.find({});
        expect(status.length).toBeGreaterThan(0);
    })


    
    
})
