const productsModel = require('../models/productModel');

exports.index = async (req, res, next) => {
    // Get products from model
    const products = await productsModel.list();
    // Pass data to view to display list of products
    res.render('products/list', {products});
};

exports.detail = async (req, res, next) => {
    res.render('products/detail', await productsModel.get(req.params.id));
}