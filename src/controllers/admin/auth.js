const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


exports.postSignUp = async (req, res, next) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (user) {
            return res.status(400).json({
                message: "Admin email already existes"
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
                hashPassword: hash_password,
                role: 'admin'
            })

            _user.save((error, user) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong"
                    })
                }
                if (user) {
                    return res.status(200).json({
                        message: "Admin created successfully"
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
            const isValidPassword = await user.authenticate(req.body.password);
            if (user) {
                if (isValidPassword && user.role === 'admin') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "10h" });
                    const { _id, firstName, lastName, fullName, email, role } = user;
                    res.cookie('token', token, { expiresIn: '10h' })
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, fullName, email, role
                        }
                    })
                } else {
                    return res.status(400).json({ message: "Invalid Password" })
                }
            } else {
                return res.status(400).json({ message: "something went wrong" })
            }
        })
}

exports.signout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout successfully'
    })
}