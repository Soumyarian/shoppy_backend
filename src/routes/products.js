const express = require('express');

const { requireSignIn, adminMiddleware, upload } = require('../shared');

const { postCreateProduct, getProductsBySlug, getProductById } = require('./../controllers/product');

const router = express.Router();

router.post('/product/create',
    requireSignIn,
    adminMiddleware,
    upload.array('productPicture'), postCreateProduct
);
router.get('/products/:slug', getProductsBySlug);
router.get('/product/:prodId', getProductById);

module.exports = router