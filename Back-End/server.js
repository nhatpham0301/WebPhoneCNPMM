var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var sanphamController = require('./controllers/sanphamController');
var userController = require('./controllers/userController');
var adminController = require('./controllers/adminController');
var donhang = require('./controllers/donhangController')
var sendMail = require('./controllers/sendMail');
var mongoose = require('./db');
var cors = require('cors');
var session = require('express-session');
const nodemailer = require("nodemailer");
require('./config/passport').FbLogin(passport);
require('./config/passport').GoogleLogin(passport);

// App configuration
// requests information
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

//...
var corsOption = {
	origin: true,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	exposedHeaders: ['x-auth-token']
  };
  app.use(cors(corsOption));

  app.use(session({
	secret: 'ilovescodetheworld',
	cookie: { maxAge: 60000 },
	resave: true,
	saveUninitialized: true
}
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'GEt', 'PoST', 'DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, Authorization');
//     next();
// })
));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));


app.get('/', function (req, res) {
    res.send('Welcome to the home page!')
});


app.listen(3000, () => console.log('Port can dung la: ' + 3000));

var apiRoutes = require('./routes/api')(app, express);
app.use('/api', apiRoutes);

var authRoutes = require('./routes/auth')(app, express, passport);
app.use('/auth', authRoutes);

// var sendMail = require('./sendEmail/sendmail')(app, express);
// app.use('/sendmail', sendMail); 

app.use('/admins', isLoggedIn ,adminController);
app.use('/users' , userController);
app.use('/products', sanphamController);
app.use('/sendmail', sendMail);
app.use('/donhang', donhang);

function isLoggedIn(req, res, next) {
	// Nếu một user đã xác thực, cho đi tiếp
	if (req.isAuthenticated())
		return next();
	// Nếu chưa, đưa về trang chủ
	res.redirect('/');
}

// send mail
// app.post("/sendmail", function(req, res) {
// 	console.log("request came");
// 	var user = req.body.email;
// 	console.log(req.body.email)
// 	const sendMail = (user, callback) => {
// 		const transporter = nodemailer.createTransport({
// 			host:"smtp.gmail.com",
// 			port:587,
// 			secure:false,
// 			auth:{
// 				user:"phamvannhat0301@gmail.com",
// 				pass:"PHAMVANNHATHN"
// 			}
// 		}); 

// 	const mailOptions = {
// 		from: `"<Sender’s name>", "<Sender’s email>"`,
// 		to:	user,
// 		//to: 'phamvannhat1601@gmail.com',
// 		subject: "<Message subject>",
// 		html: "<h1>OKKKKKKKKKK</h1>"
// 	};
// 	console.log(user)
// 	transporter.sendMail(mailOptions, callback);
// 	}

// 	sendMail(user, (err, info) => {
// 		if (err) {
// 		  console.log(err);
// 		  res.status(400);
// 		  res.send({ error: "Failed to send email" });
// 		} else {
// 		  console.log("Email has been sent");
// 		  res.send(info);
// 		}
// 	  });
//   });


 