const express = require('express');
var apiRouter = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/admin');


apiRouter.route('/login')
    .post(function(req, res, next){
       
        let promise = User.findOne({username:req.body.username}).exec();
    
        promise.then(function(doc){
            if(doc) 
            {
                if(doc.isValid(req.body.password)){
                    let token = jwt.sign({username: doc.username}, 'secret', {expiresIn: '3h'});
                    return res.status(200).json(token);
                } else {
                    return res.status(501).json({message: 'Invalid Credentials'});
                }
            } else {
                return res.status(501).json({message: 'User is not registered'});
            }
        })

        promise.catch(function(err){
            return res.status(501).json({message:'Some interal error'});
        });
        
})

apiRouter.route('/')
.post(function(req, res){
    var user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err){
        if ( err) {
            if(err.code == 11000)
            return res.json({success: false, message: 'A admin with that username already exist. '});
            else
            return res.send(err);
        }

        //res.json({message: ' User created! '});
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
apiRouter.route('/:admin_id')
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

               // res.json({ message: 'User updated!'});
            });
        });
    })

// delete the user with this id
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err) return res.send(err);
            //res.json({ message: 'Successfully deleted'});
    });
});

module.exports = apiRouter;