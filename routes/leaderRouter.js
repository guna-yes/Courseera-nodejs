var express = require('express');
var leaderRouter = express.Router();
const Leaders=require('../models/leaders')
leaderRouter.route('/')
    .get((req, res) => {
        Leaders.find({},(err, found) => {
            if (found) {
                if (found == null) {
                    res.send("Nothing to show")
                }
                else if (!found) {
                    res.send("Not found")
                }
                else {
                    console.log(found)
                    res.send(found)
                }
            }
            else {
             
                console.log(err);
                res.send(err)
            }
        })
    })
    .post((req, res) => {
        Leaders.create(req.body, (err, create) => {
            if (!err) {
                console.log("created")
                res.send(create)
            }
            else {
                console.log(err)
                res.send(err);

            }
        })
    })
    .delete((req, res) => {
        Leaders.deleteMany({}, (err) => {
            if (!err) {
                console.log("deleted successfully")
                res.send("deleted successfully")
            } else {
                console.log(err)
            }

        })
    })
    .put((req, res) => {
        res.send("Put operation cannot be supported ")
    });
leaderRouter.route("/:leaderid")
    .get((req, res) => {
        Leaders.findById(req.params.leaderid, (err, found) => {
            if(found) {
                if(found == null) {
                res.send("Nothing to show")
            }
            else if (!found) {
                res.send("Not found")
            }
            else {
                console.log(found)
                res.send(found)
            }
        }
         else {
            console.log(err);
            res.send(err.message)
        }
    })
})
    .post((req, res) => {
        res.send("cannot perform put operation")
    })
    .delete((req, res) => {
        Leaders.deleteMany({ _id: req.params.leaderid }, (err) => {
            if (err) {
                console.log(err)

            } else {
                res.send("deleted")

            }
        })
    })
    .put((req, res) => {
        Leaders.findByIdAndUpdate(req.params.leaderid, { $set: req.body }, (err, updated) => {
            if (!err) {
                res.send(updated)
                console.log("updated")
            }
            else {
                res.send(err)
                console.log(err)
            }

        })
    })


module.exports = leaderRouter;