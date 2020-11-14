var express = require('express');
var router = express.Router();
const productsModel = require('../models/productModel');
const products = productsModel.list();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('product-detail', { products });
});

module.exports = router;