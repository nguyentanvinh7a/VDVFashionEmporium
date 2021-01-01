const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const passport = require("./passport/index");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const productListRouter = require('./routes/products/list');
const productDetailRouter = require('./routes/products/detail');
const handlebarhelpers = require('handlebars-helpers')();
const exphbs  = require('express-handlebars');

const app = express();

// view engine setup
app.set('views', __dirname + '/views/');
app.set('view engine', 'hbs');
app.engine('.hbs', exphbs({defaultLayout: 'layout',
                                      extname: '.hbs',
                                      layoutsDir: __dirname + '/views/',
                                      helpers:handlebarhelpers,
}));

const { MongoClient } = require("mongodb");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Passport midleware
app.use(session({ secret: 'test' }));
app.use(passport.initialize());
app.use(passport.session());
//Pass req.user to res.locals

app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/products/', productListRouter);
app.use('/products/detail', productDetailRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);

require('./dal/db');
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
