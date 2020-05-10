var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser")
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var app = express();
var config = require('./config');



const mongoose=require("mongoose")
const url = config.mongoUrl;
const connect=mongoose.connect(url)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');

connect.then((db)=>{
  console.log("connected successfully")
},(err)=>{
  console.log(err)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
// const basicAuth = require('express-basic-auth')

// app.use(basicAuth({
//   challenge: true,
//   users: { 'me': 'openforme' }
// }));


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(express.static(__dirname + '/public'));
app.use('/dishes', dishRouter);
app.use('/leadership', leaderRouter);
app.use('/promotions', promoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
