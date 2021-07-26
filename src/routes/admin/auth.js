const express = require("express");
const router = express.Router();
const { validatorSignupRequest, validatorSigninRequest, isRequestValidated } = require('./../../validators/auth');
const { postSignUp, postSignIn, signout } = require('../../controllers/admin/auth');
const { requireSignIn } = require('../../shared/index');


router.post('/admin/signup', validatorSignupRequest, isRequestValidated, postSignUp);
router.post('/admin/signin', validatorSigninRequest, isRequestValidated, postSignIn);
router.post('/admin/signout', requireSignIn, signout);


module.exports = router;