const { ObjectId } = require('mongodb');

const cartModel = require('../models/mongoModels/cartModel');
const productModel = require('../models/mongoModels/productModel');

module.exports.index = async(req, res, next) => {
    const listProducts = await cartModel.get(ObjectId(req.params.id));
    const numberOfListProducts = await cartModel.count(ObjectId(req.params.id));
    let i = 0;
    let listDetailProduct = [];
    let totalPrice = 0;
    while(i < numberOfListProducts)
    {
        listDetailProduct[i] =  {};
        listDetailProduct[i] = (await productModel.get(listProducts[i].cloth));
        listDetailProduct[i].number = listProducts[i].number;
        i++;
    }
    i = 0;
    while(i < numberOfListProducts)
    {
        totalPrice += listProducts[i].number * listDetailProduct[i].price;
        i++;
    }
    res.render('cart', {products: listDetailProduct, totalPrice: totalPrice});
};