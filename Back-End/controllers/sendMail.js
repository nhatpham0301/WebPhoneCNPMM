const express = require('express');
var apiRouter = express.Router();
const nodemailer = require("nodemailer");

var DonHang = require('../models/donhang');

apiRouter.route('/')
.post(function(req, res) {
	console.log("request came");
	var user = req.body.email;
	var donhang = new DonHang();
	donhang.TenKH = req.body.TenKH.name;
	donhang.Email = req.body.TenKH.email;
	donhang.DonHang = req.body.DonHang;
	donhang.Tien = req.body.Tien;

	console.log(donhang.Email);
	const sendMail = (user, callback) => {
		const transporter = nodemailer.createTransport({
			host:"smtp.gmail.com",
			port:587,
			secure:false,
			auth:{
				user:"phamvannhat1601@gmail.com",
				pass:"nhatproc8"
			}
		}); 

	const mailOptions = {
		from: `"<Sender’s name>", "<Sender’s email>"`,
		to:	donhang.Email,
		//to: 'phamvannhat0301@gmail.com',
		subject: "<Message subject>",
		// html: '<p>You have got a new message</b><ul><li>Username:' + donhang.TenKH  
		// + '</li><li>Email:' + donhang.Email + '</li><li>Dadat:' + JSON.stringify(donhang.DonHang)  
		// + '</li><li>TongCong:' + donhang.Tien  + ' $</li></ul>'
		html: `<b>Chào ${donhang.TenKH}!</b>
			<p>Cảm ơn bạn đã chọn mua hàng ở Shop PRO</p>
			<p>Just Shop xin xác nhận đơn hàng của bạn như sau:</p>
			${donhang.DonHang.map(
				(i) =>
				`<p>Tên sản phẩm: ${i.TenSP} - Giá: ${i.Gia}$ - Số lượng: ${i.quantity}</p>`
			)}
			<b>Tổng: ${donhang.Tien}$</b>
			<b>Vui lòng phản hồi email này để xác thực đơn hàng</b>`
	};
	transporter.sendMail(mailOptions, callback);
	}

	sendMail(user, (err, info) => {
		if (err) {
		  console.log(err);
		  res.status(400);
		  res.send({ error: "Failed to send email" });
		} else {
		  console.log("Email has been sent");
		  res.send(info);
		}
	  });
	//    res.send({ success: true, data: user})
  });

  
  module.exports = apiRouter;