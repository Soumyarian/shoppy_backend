const jwt = require("jsonwebtoken");
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})


const s3 = new aws.S3({
    accessKeyId: 'AKIAXGGZYJJYS4VK6TVG',
    secretAccessKey: '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',
});

exports.upload = multer({ storage });

exports.uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "shoppy-bucket",
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, shortid.generate() + "-" + file.originalname);
        },
    }),
});

exports.requireSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } else {
        return res.status(400).json({ message: "Authorization Required" })
    }

}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({
            message: "User Access Denied"
        })
    }
    next()

}
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({
            message: "Access Denied"
        })
    }
    next()
}