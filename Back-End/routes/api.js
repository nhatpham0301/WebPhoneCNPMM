var User = require('../models/admin');
var SanPham = require('../models/sanpham');
var jwt = require('jsonwebtoken');
var config = require('../config/auth');

var superSecret = config["supper-seceret"];

module.exports = function (app , express) {
    
    var apiRouter = express.Router();

    apiRouter.post('/authenticate', function(req, res) {
        console.log(req.body.username);
        User.findOne({
            username: req.body.username
        }). select('name username password').exec(function (err, user) {
            
            if(err) throw err;
            if(!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if(user) {
                var validPassword = user.comparePassword(req.body.password);
                if(!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, superSecret, {
                        expiresIn: '60 * 100 * 2'
                    });
                    console.log(token);
                    res.cookie('access_token', token, {
                        maxAge: 60 * 100 * 5,
                        httpOnly: true,
                    })
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
            
        });
    });

    apiRouter.get('/', function (req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    apiRouter.route('/')
    .post(function (req, res) {
        var sanpham = new Sanpham();
        sanpham.TenSP = req.body.TenSP;
        sanpham.Gia = req.body.Gia;
        sanpham.MoTa = req.body.MoTa;
        sanpham.ImageUrl = req.body.ImageUrl;
        sanpham.save(function (err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({ success: false, message: 'Can not' });
                else
                    return res.send(err);
            }
        });
        res.send({ success: true, data: sanpham })
    })

    .get(function (req, res) {
        Sanpham.find(function (err, sanpham) {
            if (err) return res.send(err);
            res.json(sanpham);
        });
    });

apiRouter.route('/:SP_id')
    .get(function (req, res) {
        Sanpham.findById(req.params.SP_id, function (err, sanpham) {
            if (err) return res.send(err);
            res.json(sanpham);
        });
    })

    .put(function (req, res) {
        Sanpham.findById(req.params.SP_id, function (err, sanpham) {
            if (err) return res.send(err);

            if (req.body.TenSP) sanpham.TenSP = req.body.TenSP;
            if (req.body.Gia) sanpham.Gia = req.body.Gia;
            if (req.body.MoTa) sanpham.MoTa = req.body.MoTa;
            if (req.body.ImageUrl) sanpham.ImageUrl = req.body.ImageUrl;

            sanpham.save(function (err) {
                if(err) return res.send(err);
                        
                //res.json({ message: 'Sanpham updated!'});
            });
            res.send({ success: true, data: sanpham })

        });
    })

    .delete(function (req, res) {
        Sanpham.remove({
            _id: req.params.SP_id
        }, function (err, sanpham) {
            if (err) return res.send(err);

            res.json({ message: ' Deleted!' });
        });
    });

    return apiRouter;

}