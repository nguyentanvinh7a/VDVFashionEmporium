const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const passport = require("./passport/index");
const MongoDBStore = require('connect-mongodb-session')(session)
let store = new MongoDBStore({
    uri: 'mongodb+srv://nguyentanvinh7a:01685698193@cluster0.ebrk4.mongodb.net/test',
    databaseName: 'store',
    collection: 'session',
    function(error) {
        // Should have gotten an error
    }});

store.on('error', function(error) {
    // Also get an error here
});
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const productListRouter = require('./routes/products/list');
const productDetailRouter = require('./routes/products/detail');
const cartRouter = require('./routes/cart');
const handlebarhelpers = require('handlebars-helpers')();
const exphbs = require('express-handlebars');

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
app.use(session({ secret: 'test',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: store,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Pass req.user to res.locals
app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})

//Routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/login',loginRouter);
app.use('/products/', productListRouter);
app.use('/products/detail', productDetailRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/cart', cartRouter);

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
