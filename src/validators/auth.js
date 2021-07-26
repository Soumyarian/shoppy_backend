const { check, validationResult } = require('express-validator');

exports.validatorSignupRequest = [
    check("firstName").notEmpty().withMessage("First name is required"),
    check("lastName").notEmpty().withMessage("Last name is required"),
    check("email").isEmail().withMessage("Valid Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be minimum 6 character long"),
]
exports.validatorSigninRequest = [
    check("email").isEmail().withMessage("Valid Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be minimum 6 character long"),
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            message: "Something went wrongg",
            errors: errors.array()[0]
        })
    } else {
        next();
    }
}