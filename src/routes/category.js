const express = require('express');

const { requireSignIn, adminMiddleware, upload } = require('../shared');
const { postCreateCategory, getCategories, postUpdateCategories, postDeleteCategories } = require('./../controllers/category');

const router = express.Router();

router.post('/category/create', requireSignIn, adminMiddleware, upload.single("categoryImage"), postCreateCategory)
router.get('/category', getCategories);
router.post('/category/update', requireSignIn, adminMiddleware, upload.array("categoryImage"), postUpdateCategories)
router.post('/category/delete', requireSignIn, adminMiddleware, postDeleteCategories);

module.exports = router;