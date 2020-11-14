const productsModel = require('../models/productModel');

exports.index = (req, res, next) => {
    // Get products from model
    const products = productsModel.list();
    // Pass data to view to display list of products
    res.render('collections', {products});
};