const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv').config();

require('./database/mongoose');
const userRouter = require('./routers/user');

app.use(bodyParser.urlencoded({ extended:                                                                                                                                                                                                                                                                                                                                                                                                                                                                   false }));

app.use(cors());

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(userRouter);


//server port
app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});