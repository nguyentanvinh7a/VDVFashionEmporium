const { ObjectId } = require('mongodb');

const productService = require('../models/productService');
const productsModel = require('../models/mongoModels/productModel')
const productDetailService = require('../models/productDetailService')
const ITEM_PRODUCT_PER_PAGE = 6;
const ITEM_REVIEW_PER_PAGE = 10;

module.exports.index = async(req, res, next) => {
    const page = +req.query.page || 1;
    const productId = req.query.productId;
    const q = req.query.q;
    const filter = {};
    if (productId)
        filter.typeProduct = ObjectId(productId);
    if (q)
        filter.nameProduct = new RegExp(q, 'i');
    const totalProduct = await productService.count(filter);
    const products = await productService.list(filter, page - 1, ITEM_PRODUCT_PER_PAGE);
    // Get products from model
    //const products = await productService.list();
    // Pass data to view to display list of products
    res.render('products/list', {
        products: products,
        hasNextPage: ITEM_PRODUCT_PER_PAGE * page < totalProduct,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        lastPage: Math.ceil(totalProduct / ITEM_PRODUCT_PER_PAGE),
        ITEM_PRODUCT_PER_PAGE: ITEM_PRODUCT_PER_PAGE,
        currentPage: page,
        productId: productId,
        q: q,
    });

};

module.exports.detail = async(req, res, next) => {
    const product = await productsModel.get(req.params.id);
    //const reviews = await productsModel.listReview(req.params.id);
    const page = +req.query.page || 1;
    const productId = ObjectId(req.params.id);
    const totalReview = await productDetailService.count(productId);
    const reviews = await productDetailService.list(productId, page - 1, ITEM_REVIEW_PER_PAGE);
    res.render('products/detail', {
        product: product,
        reviews: reviews,
        hasNextPage: ITEM_REVIEW_PER_PAGE * page < totalReview,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        lastPage: Math.ceil(totalReview / ITEM_REVIEW_PER_PAGE),
        ITEM_REVIEW_PER_PAGE: ITEM_REVIEW_PER_PAGE,
        currentPage: page,
    });
}

module.exports.newProducts = async(req, res, next) => {
    const totalProduct = await productService.count();
    const newProducts = await productService.listNewProducts(totalProduct);
    res.render('home', { products: newProducts });
}

module.exports.addReview = async(req, res, next) => {
    let product = req.params.id;
    const review = req.body.review;
    if (req.user) {
        const name = req.user.username;
        const newReview = {
            name,
            review,
            product
        };
        await productsModel.addReview(newReview);
    } else {
        const name = req.body.name;
        const newReview = {
            name,
            review,
            product
        };
        await productsModel.addReview(newReview);
    };
    //product = await productsModel.get(req.params.id);
    //const reviews = await productsModel.listReview(req.params.id);
    // res.render('products/detail', {product: product, reviews: reviews});
    this.detail(req, res, next);
}