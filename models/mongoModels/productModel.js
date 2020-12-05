const {db} = require('../../dal/db');
const { ObjectId} = require('mongodb');

exports.list = async () => {
    console.log('model db');
    const productsCollection = db().collection('cloth');
    const products = await productsCollection.find({}).toArray();
    //console.dir(products);
    return products;
}

exports.get = async (id) => {
    const productsCollection = db().collection('cloth');
    const product = await productsCollection.findOne({_id: ObjectId(id)});
    return product;
}