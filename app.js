const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv').config();

require('./database/mongoose');
const userRouter = require('./routers/user');
const movieRouter = require('./routers/movie');
const commentRouter = require('./routers/comment');
const favouriteRouter = require('./routers/favourite');

app.use(bodyParser.urlencoded({ extended:                                                                                                                                                                                                                                                                                                                                                                                                                                                                   false }));

app.use(cors());

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(userRouter);
app.use(movieRouter);
app.use(commentRouter);
app.use(favouriteRouter);


//server port
app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});