const userService = require("../models/userService");

exports.addUser = async (req, res) => {
    const {username, email, password} = req.body;
    let status = 'Active';
    const newUser = {
        username,
        email,
        password,
        status,
    };

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
    }
}