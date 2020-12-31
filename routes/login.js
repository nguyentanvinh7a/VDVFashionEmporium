const express = require('express');
const router = express.Router();
const passport = require('../passport/index');

router.post('/',passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true })
);

router.get('/', function(req, res, next) {
        res.render('login');
});

module.exports = router;