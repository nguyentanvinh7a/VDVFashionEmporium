const userService = require('../../models/userService')

exports.isExist = async (req, res, next) => {
    res.json(await userService.checkExistUser(req.query.username));
}
