const req = require("express");
const {db} = require('../../dal/db');
const { ObjectId} = require('mongodb');

exports.list = async (filter = {}) => {
    const productsCollection = db().collection('cloth');
    const products = await productsCollection.find(filter).toArray();
    return products;
}

exports.get = async (id) => {
    const productsCollection = db().collection('cloth');
    const product = await productsCollection.findOne({_id: ObjectId(id)});
    return product;
}

exports.listReview = async (productId) => {
    const productReviews = db().collection('review');
    const reviews = await productReviews.find({product: ObjectId(productId)}).toArray();
    return reviews;
}

exports.addReview = async (review) => {
    let f = true;
    try {
        await db().collection('review').insertOne({
            name: review.name,
            review: review.review,
            product: ObjectId(review.product)
        });
    } catch (e) {
        console.log(e);
        f = false;
    }
    return f;
}