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
    const usersCollection = db().collection('user');
    const user = await usersCollection.findOne({_id: ObjectId(id)});
    return user;
}