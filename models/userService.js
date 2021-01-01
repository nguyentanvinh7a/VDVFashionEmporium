const bcrypt = require("bcrypt");
const { db } = require('../dal/db');
const { ObjectId } = require('mongodb');
const userMongoModel = require("./mongoModels/userModel");

exports.addUser = async (newUser)=>{
    const saltRounds = 10;

    await bcrypt.genSalt(saltRounds,function (err,salt){
        bcrypt.hash(newUser.password,salt,function (err,hash){
            let user = userMongoModel.add({
                username: newUser.username,
                email: newUser.email,
                password: hash,
                status: "active",
            });
            user
                .save()
                .then((doc)=>{})
                .then((err)=>{
                    console.log(err);
                });
            return user;
        });
    });
    return;
};
//Check for valid username and password. Return user info if valid
exports.checkCredential = async (username, password)=>{
    const usersCollection = db().collection('user');
    const user = await usersCollection.findOne({username: username});
    if(!user)
        return false;
    let checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) return user;
    else return false;
}

exports.getUser = (id)=>{
    return userMongoModel.get(id);
}