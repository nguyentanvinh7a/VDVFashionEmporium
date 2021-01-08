const { ObjectId } = require('mongodb');

const cartModel = require('../models/mongoModels/cartModel');
const productModel = require('../models/mongoModels/productModel');

module.exports.index = async(req, res, next) => {
    let listProducts = await cartModel.getByUser(ObjectId(req.params.id));
    let numberOfListProducts = await cartModel.countByUser(ObjectId(req.params.id));
    if (listProducts.length == 0){
    listProducts =  await cartModel.getBySession(req.sessionID);
    numberOfListProducts = await cartModel.countBySession(req.sessionID);}
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

module.exports.addToCart = async function(req, res, next){
    const productId = ObjectId(req.params.productId);
    const sessionId = req.sessionID;

    if(!sessionId){
        res.redirect('/products');
        return;
    }
    await cartModel.addSession(sessionId, productId);
    res.redirect('/cart');
}

module.exports.deleteFromCart = async function(req, res, next){
    const productId = ObjectId(req.params.productId);
    const sessionId = req.sessionID;

    if(!sessionId){
        res.redirect('/products');
        return;
    }
    await cartModel.deleteSession(sessionId, productId);
    res.redirect('/cart');
}

module.exports.updateNumberOfProduct = async function(req, res, next){
    const productId = ObjectId(req.params.productId);
    const sessionId = req.sessionID;
    const number = req.body.number;
    if(!sessionId){
        res.redirect('/products');
        return;
    }
    await cartModel.updateSession(sessionId, productId, number);
    res.redirect('/cart');
}

