const { ObjectId } = require('mongodb');

const productService = require('../models/productService');
const productsModel = require('../models/mongoModels/productModel')
const ITEM_PER_PAGE = 6;

module.exports.index = async(req, res, next) => {
    const page = +req.query.page || 1;
    const productId = req.query.productId;
    const q = req.query.q;
    const totalProduct = await productService.count();
    const filter = {};
    if (productId)
        filter.typeProduct = ObjectId(productId);
    if (q)
        filter.nameProduct = new RegExp(q, 'i');
    const products = await productService.list(filter, page - 1, ITEM_PER_PAGE);
    // Get products from model
    //const products = await productService.list();
    // Pass data to view to display list of products
    res.render('products/list', {
        products: products,
        hasNextPage: ITEM_PER_PAGE * page < totalProduct,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        lastPage: Math.ceil(totalProduct / ITEM_PER_PAGE),
        ITEM_PER_PAGE: ITEM_PER_PAGE,
        currentPage: page,
        productId: productId,
        q: q,
    });

};

module.exports.detail = async(req, res, next) => {
    const product = await productsModel.get(req.params.id);
    const reviews = await productsModel.listReview(req.params.id);
    res.render('products/detail', {product: product, reviews: reviews});
}

module.exports.newProducts = async (req, res, next) => {
    const totalProduct = await productService.count();
    const newProducts = await productService.listNewProducts(totalProduct);
    res.render('home', {products: newProducts});
}

module.exports.addReview = async (req, res, next) => {
    const {name, review} = req.body;
    let product = req.params.id;
    const newReview = {
        name,
        review,
        product
    };
    await productsModel.addReview(newReview);
    product = await productsModel.get(req.params.id);
    const reviews = await productsModel.listReview(req.params.id);
    res.render('products/detail', {product: product, reviews: reviews});
}