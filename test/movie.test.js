// use the path of your model
const Movie = require('../models/movie');
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


describe('Movie Schema', () => {
    let movies;
         it('add a movie', () => {
             const movie = {
                 'title': 'Thor',
                 'description': 'Marvel Movie',
                 'rating': 4,
                 'year': '2018',
                 'genre': 'Thriller',
                 'review': 'Fantastic movie'
             };

             const movie2 = {
                 'title': 'Ant Man',
                 'description': 'Marvel Movie',
                 'rating': 3,
                 'year': '2017',
                 'genre': 'Sci-Fi',
                 'review': 'Fantastic movie'
             };
            
             return Movie.create(movie2)
                 .then((pro_ret) => {
                     expect(pro_ret.title).toEqual('Ant Man');
                 });
        });

   
})