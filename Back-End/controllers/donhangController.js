const express = require('express');
var apiRouter = express.Router();

var Sanpham = require('../models/donhang');

apiRouter.route('/')
    .post(function  (req, res) {
        var sanpham = new Sanpham();
        sanpham.TenKH = req.body.TenKH.name;
        sanpham.Email = req.body.TenKH.email;
        sanpham.DonHang = req.body.DonHang;
        // sanpham.TenSP = req.body.TenSP;
        // sanpham.Gia = req.body.Gia;
        // sanpham.MoTa = req.body.MoTa;
        // sanpham.ImageUrl = req.body.ImageUrl;
        sanpham.Tien = req.body.Tien;
        
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

    .get(function  async(req, res) {
        Sanpham.find(function  async(err, sanpham) {
            if (err) return res.send(err);
            res.json(sanpham);
        });
    });

// apiRouter.route('/:SP_id')
//     .get(function (req, res) {
//         Sanpham.findById(req.params.SP_id, function (err, sanpham) {
//             if (err) return res.send(err);
//             res.json(sanpham);
//         });
//     })

//     .put(function (req, res) {
//         Sanpham.findById(req.params.SP_id, function (err, sanpham) {
//             if (err) return res.send(err);

//             if (req.body.TenSP) sanpham.TenSP = req.body.TenSP;
//             if (req.body.Gia) sanpham.Gia = req.body.Gia;
//             if (req.body.MoTa) sanpham.MoTa = req.body.MoTa;
//             if (req.body.ImageUrl) sanpham.ImageUrl = req.body.ImageUrl;

//             sanpham.save(function (err) {
//                 if(err) return res.send(err);
                        
//                 //res.json({ message: 'Sanpham updated!'});
//             });
//             res.send({ success: true, data: sanpham })

//         });
//     })

//     .delete(function (req, res) {
//         Sanpham.remove({
//             _id: req.params.SP_id
//         }, function (err, sanpham) {
//             if (err) return res.send(err);

//             res.json({ message: ' Deleted!' });
//         });
//     });

    
//   apiRouter.route('/test').post(function(req, res){
//     res.json(req.body.email);
//     res.send(req.body.email);
//     res.send({error: "wwhat??????????//"})
//   console.log(req.body.email);
// });

module.exports = apiRouter;