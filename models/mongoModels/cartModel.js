const {db} = require('../../dal/db');
const { ObjectId} = require('mongodb');

exports.get = async (userId) => {
    const cartCollection = db().collection('cart');
    const cart = await cartCollection.find({user: ObjectId(userId)}).toArray();
    return cart;
}

exports.count = async (userId) => {
    const cartCollection = db().collection('cart');
    return await cartCollection.find({user: ObjectId(userId)}).count();
}