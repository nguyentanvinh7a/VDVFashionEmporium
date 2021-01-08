const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:id', cartController.index);
router.get('/', cartController.index);
router.get('/add/:productId', cartController.addToCart);
router.get('/delete/:productId', cartController.deleteFromCart);
router.post('/update/:productId', cartController.updateNumberOfProduct);

module.exports = router;