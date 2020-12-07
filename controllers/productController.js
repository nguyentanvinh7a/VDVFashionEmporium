const {ObjectId} = require('mongodb');

const productService = require('../models/productService');
const productsModel = require('../models/mongoModels/productModel')
const ITEM_PER_PAGE = 6;

module.exports.index = async (req, res, next) => {
    const page = +req.query.page || 1;
    const productId = req.query.productId;
    const totalProduct = await productService.count();
    const products = await productService.list(productId ? {productId : ObjectId} : {}, page - 1, ITEM_PER_PAGE);

    // Get products from model
    //const products = await productService.list();
    // Pass data to view to display list of products
    res.render('products/list', {products,
                                hasNextPage: ITEM_PER_PAGE * page < totalProduct,
                                hasPreviousPage: page > 1,
                                nextPage: page + 1,
                                prevPage: page - 1,
                                lastPage: Math.ceil(totalProduct/ITEM_PER_PAGE),
                                ITEM_PER_PAGE: ITEM_PER_PAGE,
                                currentPage: page,
    });

};

exports.detail = async (req, res, next) => {
    res.render('products/detail', await productsModel.get(req.params.id));
}