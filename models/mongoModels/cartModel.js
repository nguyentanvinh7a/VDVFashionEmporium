const {db} = require('../../dal/db');
const { ObjectId} = require('mongodb');

exports.getByUser = async (userId) => {
    const cartCollection = db().collection('cart');
    const cart = await cartCollection.find({user: ObjectId(userId)}).toArray();
    return cart;
}

exports.getBySession = async (sessionId) => {
    const cartCollection = db().collection('cart');
    const cart = await cartCollection.find({session: sessionId}).toArray();
    return cart;
}

exports.countByUser = async (userId) => {
    const cartCollection = db().collection('cart');
    return await cartCollection.find({user: ObjectId(userId)}).count();
}

exports.countBySession = async (sessionId) => {
    const cartCollection = db().collection('cart');
    return await cartCollection.find({session: sessionId}).count();
}

exports.addSession = async (sessionId, productId) => {
    const cartCollection = db().collection('cart');
    const cart = await cartCollection.find({session: sessionId, cloth: productId}).toArray();
    if(cart === undefined || cart.length == 0){
        await db().collection('cart').insertOne({
            cloth: productId,
            number: 1,
            session: sessionId
        })
    }
    else
        await db().collection('cart').updateOne({session: sessionId, cloth: productId}, {$set: {
                number: cart[0].number + 1,
            }}
        )
}

exports.deleteSession = async (sessionId, productId) => {
    const cartCollection = db().collection('cart');
    const cart = await cartCollection.find({session: sessionId, cloth: productId}).toArray();
    if (Array.isArray(cart) && cart.length) {
        await cartCollection.deleteOne({session: sessionId, cloth: productId});
    }
}

exports.updateSession = async (sessionId, productId, number) => {
    const cartCollection = db().collection('cart');
    const cart = await cartCollection.find({session: sessionId, cloth: productId}).toArray();
    if (Array.isArray(cart) && cart.length) {
        await db().collection('cart').updateOne({session: sessionId, cloth: productId}, {$set: {
            number: number,
        }})}
    }