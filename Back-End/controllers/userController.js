const express = require('express');
var apiRouter = express.Router();

var User = require('../models/user');


apiRouter.route('/')
.post(function(req, res){
    var user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err){
        if ( err) {
            if(err.code == 11000)
            return res.json({success: false, message: 'A user with that username already exist. '});
            else
            return res.send(err);
        }

        res.json({message: ' User created! '});
    });
})

//get all user
.get(function(req,res){
    User.find(function(err, users){
        if(err) return res.send(err);
        res.json(users);
    });
});

//getting a single User (Get/api/users/:user_id)
apiRouter.route('/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if(err) return res.send(err);

            res.json(user);
        });
    })

//update the user with this id
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if(err) return res.send(err);

            if(req.body.name) user.name = req.body.name;
            if(req.body.name) user.username = req.body.username;
            if(req.body.password) user.password = req.body.password;

            user.save(function(err) {
                if(err) return res.send(err);

                res.json({ message: 'User updated!'});
            });
        });
    })

// delete the user with this id
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Successfully deleted'});
    });
});

module.exports = apiRouter;