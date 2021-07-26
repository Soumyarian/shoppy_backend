const express = require('express');
const { requireSignIn, userMiddleware } = require('./../shared');

const { getCartItems, addItemToCart, removeCartItems } = require('./../controllers/cart');

const router = express.Router();

router.post('/user/cart/addtocart', requireSignIn, userMiddleware, addItemToCart);
router.get("/user/getCartItems", requireSignIn, userMiddleware, getCartItems);
router.post("/user/cart/removeItem", requireSignIn, userMiddleware, removeCartItems);

module.exports = router