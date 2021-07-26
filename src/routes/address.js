const express = require('express');
const { requireSignIn, userMiddleware } = require('./../shared');

const addressController = require('./../controllers/address');

const router = express.Router();

router.post('/user/address/create', requireSignIn, userMiddleware, addressController.addAddress);
router.get("/user/getaddress", requireSignIn, userMiddleware, addressController.getAddress);


module.exports = router