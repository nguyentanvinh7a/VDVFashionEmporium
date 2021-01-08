const express = require('express');
const router = express.Router();
const passport = require('../passport/index');
//const userController = require('/controllers/userController')

router.post('/',passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login?err=wrong-password',
        failureFlash: false })
);

router.get('/', function(req, res, next) {
        res.render('login',{err: req.query.err});
});


module.exports = router;