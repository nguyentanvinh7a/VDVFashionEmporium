var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");

router.get('/:userId', userController.index);
router.post('/:userId/edit', userController.editUser);
router.get('/', userController.index);

module.exports = router;