const express= require("express")
const http=require("http")
const app=express();
const bodyParser=require("body-parser")

app.use(express.static(__dirname + '/public'));

app.use (bodyParser.urlencoded({extended:true}));

var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');


app.use('/dishes', dishRouter);
app.use('/leadership', leaderRouter);
app.use('/promotions', promoRouter);

app.listen(3000,()=>{
    console.log("listening on port 3000")
});