const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/finalBackendMoviereview', {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify:false

});

