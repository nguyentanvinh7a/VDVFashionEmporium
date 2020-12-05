const productService = require('../models/productService');
const productsModel = require('../models/mongoModels/productModel')
const ITEM_PER_PAGE = 2;

module.exports.index = async (req, res, next) => {
    const page = +req.query.page || 1;
    const totalProduct = await productService.count();
    console.log(totalProduct);
    const products = await productService.list(page, ITEM_PER_PAGE);

    // Get products from model
    //const products = await productService.list();
    // Pass data to view to display list of products
    res.render('products/list', {products});
};

exports.detail = async (req, res, next) => {
    res.render('products/detail', await productsModel.get(req.params.id));
}