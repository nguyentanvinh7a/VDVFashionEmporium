const formidable = require('formidable');
const fs = require('fs');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'ho-chi-minh-city-university-of-science-vietnam-national-university',
    api_key: '523151583798143',
    api_secret: 'VrF_ooPKNUzOjl6JxZEv-jFSAcg'
});

const userService = require("../models/userService");
const userModel = require("../models/mongoModels/userModel")

exports.addUser = async (req, res) => {
    const {username, email, password} = req.body;
    if(password.length < 8)
    {
        res.redirect("login?err=password-length");
        return
    }
    if(await userService.comparePasswordAndConfirmPassword(password, req.body.confirmPassword) != false)
    {
        res.redirect("login?err=different-password-and-confirm-password");
        return
    }
    let status = 'Active';
    const newUser = {
        username,
        email,
        password,
        status,
    };
    if(await userService.checkExistUser(username)){
        res.redirect("login?err=exist-user");
        return
    }
    else{
    try{
        await userService.addUser(newUser).then(()=>{
            res.redirect("login");
        })
    } catch(err){
        res.render("login",{
            title: "Register",
            err: "You can't create an account right now. Try again later!",
        });
    return;
    }}
}

exports.index = async (req, res, next) => {
    const user = await userModel.getUserByUsername(req.user.username);
    res.render('user',{user: user});
}

exports.editUser = (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const avatar = files.avatar;
        const avatarCutPath = avatar.path + 'cut';
        if(avatar && avatar.size > 0) {
            this.deleteOldAvatar(req, res, next);
                sharp(avatar.path)
                    .resize(200, 200)
                    .toFile(avatarCutPath).then(() => {
                    cloudinary.uploader.upload(avatarCutPath, (error, result ) => {fields.avatar = result.secure_url;})
                        .then(() => {userModel.edit(req.user.username, fields)
                            .then(res.redirect('/user/'))})})
        }
        else {
            userModel.edit(req.user.username, fields).then(() => {
                res.redirect('/user/')
            });
        }
    });
}

exports.deleteOldAvatar = async (req, res, next) => {
    const user = await userModel.getUserByUsername(req.user.username);
    const oldAvatar = user.avatar;
    if(oldAvatar){
    let publicIdOldAvatar = oldAvatar.split('.')[2].split('/')[5];
    await cloudinary.uploader.destroy(publicIdOldAvatar);
    }
}