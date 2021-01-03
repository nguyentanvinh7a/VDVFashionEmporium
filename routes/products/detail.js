const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

router.get('/:id', productController.detail);
router.post('/:id', productController.addReview);

module.exports = router;