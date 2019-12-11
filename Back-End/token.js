var apiRouter = express.Router();

apiRouter.post('/authenticate', function (req, res) {
    User.findOne({
        username: req.body.username
    }).select('name username password').exec(function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {
                var token = jwt.sign({
                    name: user.name,
                    username: user.username
                }, superSecret, {
                    expiresIn: '24h'
                });

                res.json({
                    success: true,
                    message: 'Lam viec voi token!',
                    token: token
                });
            }
        }
    });
});

apiRouter.use(function(req, res, next) {
    console.log('Dang lam tren App!');

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token) {
        jwt.verify(token, superSecret, function(err, decoded) {
            if(err) {
                return res.json({ success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

apiRouter.get('/', function (req, res) {
    res.json({ message: 'API' });
}); 