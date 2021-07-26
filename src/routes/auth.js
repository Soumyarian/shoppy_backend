const express = require("express");
const router = express.Router();

const { validatorSignupRequest, validatorSigninRequest, isRequestValidated } = require('./../validators/auth');
const { postSignUp, postSignIn } = require('../controllers/auth');

router.post('/signup', validatorSignupRequest, isRequestValidated, postSignUp);
router.post('/signin', validatorSigninRequest, isRequestValidated, postSignIn);

module.exports = router;