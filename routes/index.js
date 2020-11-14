var express = require('express');
var router = express.Router();
const newProductsModel = require('../models/newProductModel');
const bestSellersModel = require('../models/bestSellerModel');

const newProducts = newProductsModel.list();
const bestSellers = bestSellersModel.list();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {newProducts, bestSellers});
});

module.exports = router;
