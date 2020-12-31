const {db} = require('../../dal/db');
const { ObjectId} = require('mongodb');

exports.add = async(user) => {
    let f = true;
    try {
        await db().collection('user').insertOne({
            username: user.username,
            email: user.email,
            password: user.password,
            status: user.status,
        });
    } catch (e) {
        console.log(e);
        f = false;
    }
    return f;
}
exports.get = async (id) => {
    const productsCollection = db().collection('cloth');
    const product = await productsCollection.findOne({_id: ObjectId(id)});
    return product;
}