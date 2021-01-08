const userService = require("../models/userService");

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