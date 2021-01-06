const { db } = require('../dal/db');
const { ObjectId } = require('mongodb');

exports.count = async(productId) => {
    const productReviewCollection = db().collection('review');
    return productReviewCollection.find({product: productId}).count();
}

exports.list = async(productId, pageIndex, itemPerPage) => {
    const productReviewsCollection = db().collection('review');
    const productReview = await productReviewsCollection.find({product: productId})
        .skip(pageIndex * itemPerPage)
        .limit(itemPerPage)
        .toArray();
    return productReview;
}