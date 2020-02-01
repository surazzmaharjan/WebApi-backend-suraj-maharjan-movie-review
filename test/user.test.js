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


       
    
    
})
