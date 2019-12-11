const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/web_didong', (err) =>{
    if (!err)
        console.log('MongoDB connection is succeeded.');
    else
        console.log('Err in DB conect: ' + JSON.stringify(err, undefined, 2));

});

module.exports = mongoose;
