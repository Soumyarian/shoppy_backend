const express = require('express');

const { requireSignIn, adminMiddleware, uploadS3 } = require('../shared');
const { postCreateCategory, getCategories, postUpdateCategories, postDeleteCategories } = require('./../controllers/category');

const router = express.Router();

router.post('/category/create', requireSignIn, adminMiddleware, uploadS3.array("categoryImage"), postCreateCategory);
router.get('/category', getCategories);
router.post('/category/update', requireSignIn, adminMiddleware, uploadS3.array("categoryImage"), postUpdateCategories)
router.post('/category/delete', requireSignIn, adminMiddleware, postDeleteCategories);

module.exports = router;