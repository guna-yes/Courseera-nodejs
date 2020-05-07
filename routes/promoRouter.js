var express = require('express');
var promoRouter = express.Router();
var bodyParser=require("body-parser")
const Promos=require("../models/promotions")
promoRouter.use(bodyParser.urlencoded({urlencoded:true}))

promoRouter.route('/')
 .get((req,res)=>
 {
     Promos.find((err,found)=>{
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
             res.send(err.message)
         }
     })
 })
 .post((req,res)=>{
     Promos.create(req.body,(err,create)=>{
         if(!err){
             console.log("created")
             res.send(create)
         }
         else{
             console.log(err)
             res.send(err);
             
         }
     })
})
.delete((req,res)=>{
    Promos.deleteMany({},(err)=>{
        if(!err){
            console.log("deleted successfully")
            res.send("deleted successfully")
        }else{
            console.log(err)
        }

    })
})
.put((req,res)=>{
    res.send("Put operation cannot be supported ")
});
promoRouter.route("/:promoid")
.get((req,res)=>{
    Promos.findById(req.params.promoid,(err,found)=>{
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
            res.send(err.message)
        }
    })
})
.post((req,res)=>{
    res.send("cannot perform put operation")
})
.delete((req,res)=>{
    Promos.deleteMany({_id:req.params.promoid},(err)=>{
        if(err){
            console.log(err)

        }else{
            res.send("deleted")

        }    
})
})
.put((req,res)=>{
    Promos.findByIdAndUpdate(req.params.promoid,{$set:req.body},(err,updated)=>{
        if(!err){
            res.send(updated)
            console.log("updated")
        }
        else{
            res.send(err)
            console.log(err)
        }

})
})


module.exports = promoRouter;


