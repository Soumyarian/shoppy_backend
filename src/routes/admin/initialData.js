const express = require('express');

const { getInitialData } = require('./../../controllers/admin/initialData');
const { requireSignIn, adminMiddleware } = require('./../../shared/index')
const router = express.Router();

router.post('/admin/initialData', requireSignIn, adminMiddleware, getInitialData);


module.exports = router;