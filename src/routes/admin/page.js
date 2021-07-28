const express = require('express');
const { uploadS3, requireSignIn, adminMiddleware } = require("./../../shared");
const pageController = require('./../../controllers/page');

const router = express.Router();

router.post('/page/create', requireSignIn, adminMiddleware, uploadS3.fields([
    { name: 'banners' },
    { name: 'products' }
]), pageController.createPage);
router.get('/page/:category/:type', pageController.getPage);

module.exports = router;