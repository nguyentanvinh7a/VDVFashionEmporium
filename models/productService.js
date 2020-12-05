const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');
const productMongo = require('./mongoModels/productModel');

exports.list = async (pageIndex, itemPerPage) => {
    const productsCollection = db().collection('cloth');
    const products = await productsCollection.find({})
        .skip(pageIndex)
        .limit(itemPerPage)
        .toArray();
    console.dir(products);
    return products;
}
exports.count = async () => {
    const productsCollection = db().collection('cloth');
    return productsCollection.find({}).count();
}