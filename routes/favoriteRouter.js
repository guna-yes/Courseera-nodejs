const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const  Favourite= require('../models/favourites');
var authenticate = require('../authenticate');
const cors = require('./cors');


const favouriteRouter=express.Router();
favouriteRouter.use(bodyParser.urlencoded({extended:true}))

favouriteRouter.route("/")
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors,authenticate.verifyUser,(req,res)=>{
        Favourite.find({user:req.user._id})
        .populate("user")
        .populate("favouriteDishes")
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .post(cors.corsWithOptions,authenticate.verifyUser,(req,res)=>{
        Favourite.findOne({user:req.user._id})
        .then((favourite)=>{
            if (favourite) {
                {
                    favourite.favouriteDishes.push(req.body);
                    favourite.save()
                        .then((favorite) => {
                            console.log('Favorite Created ', favorite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, (err) => next(err));
                }


            }
            else {
                Favourite.create({ "user": req.user._id, "favouriteDishes": req.body })
                    .then((favorite) => {
                        console.log('Favorite Created ', favorite);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    }, (err) => next(err));
            }
        }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favourite.findOneAndRemove({ "user": req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
favouriteRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /favorites/' + req.params.dishId);
    })
    .post(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favourite.findOne({ user: req.user._id })
            .then((favourite) => {
                if (favourite) {
                    if (favourite.favouriteDishes.indexOf(req.params.dishId) !== -1) {
                        var err = new Error('Already added');
                        err.status = 400;
                        return next(err);
                    }
                    else {
                        favourite.favouriteDishes.push(req.params.dishId);
                        favouriteDishes.save()
                            .then((resp) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(resp);
                            }, (err) => next(err))
                            .catch((err) => next(err));
                    }
                }
                else {
                   
                    Favourite.create({ "user": req.user._id, "favouriteDishes":req.params.dishId})
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                }
            })
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites/' + req.params.dishId);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favourite.findOne({ user: req.user._id })
            .then((favourite) => {
                if (favourite) {
                    found = favourite.favouriteDishes.indexOf(req.params.dishId);
                    if (found >= 0) {
                        favorite.dishes.remove(index);
                        favorite.save()
                            .then((favorite) => {
                                console.log('Favorite Deleted ', favorite);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorite);
                            }, (err) => next(err));
                    }
                    else {
                        err = new Error('Dish ' + req.params.dishId + ' not found');
                        err.status = 404;
                        return next(err);
                    }
                }
                else {
                    err = new Error('Favorites not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });
module.exports=favouriteRouter;