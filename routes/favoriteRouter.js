// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const  Favourite= require('../models/favourites');
// var authenticate = require('../authenticate');
// const cors = require('./cors');


// const favouriteRouter=express.Router();
// favouriteRouter.use(bodyParser.urlencoded({extended:true}))

// favouriteRouter("/")
//     .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
//     .get(authenticate.verifyUser,(req,res)=>{
//         Favourite.find({})
//         .populate("user")
//         .populate("favouriteDishes")
//             .then((dishes) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(dishes);
//             }, (err) => next(err))
//             .catch((err) => next(err));

//     })








// module.exports=favouriteRouter;