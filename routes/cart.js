const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:id', cartController.index);
router.get('/', cartController.index);
router.get('/add/:productId', cartController.addToCart);

module.exports = router;