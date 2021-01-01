const express = require('express');
const router = express.Router();
const passport = require('../passport/index');

router.post('/',passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login?err=wrong-password',
        failureFlash: false })
);

router.get('/', function(req, res, next) {
        res.render('login');
});

module.exports = router;