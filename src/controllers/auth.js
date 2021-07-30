const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


exports.postSignUp = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (user) {
            return res.status(400).json({
                message: "email already existes"
            })
        } else {
            const {
                firstName,
                lastName,
                email,
                password,
                userName
            } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({
                firstName,
                lastName,
                userName,
                email,
                hashPassword: hash_password
            })
            _user.save((error, user) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong"
                    })
                }
                if (user) {
                    return res.status(201).json({
                        message: "User created successfully"
                    })
                }
            })
        }
    })
}

exports.postSignIn = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (error) return res.status(400).json({ error })
            if (user) {
                const isValidPassword = await user.authenticate(req.body.password);
                if (isValidPassword && user.role === "user") {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "10h" })
                    const { _id, firstName, lastName, fullName, email, role } = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, fullName, email, role
                        }
                    })
                } else {
                    return res.status(401).json({ message: "Invalid Password" })
                }
            } else {
                return res.status(401).json({ message: "user does not exist" })
            }
        })
}

