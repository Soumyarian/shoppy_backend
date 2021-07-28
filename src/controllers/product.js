const slugify = require("slugify");

const Product = require('./../models/product');
const Category = require('./../models/category');


exports.postCreateProduct = (req, res, next) => {
    // res.status(200).json({ file: req.files, body: req.body });

    const { name, price, description, category, quantity } = req.body;
    let productPictures = []
    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.location }
        })
    }
    const newProduct = new Product({
        name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        quantity,
        category,
        createdBy: req.user._id
    })
    newProduct.save((error, product) => {
        if (error) {
            res.status(400).json({ error });
        }
        if (product) {
            res.status(200).json(product);
        }
    })
}

exports.getProductsBySlug = (req, res, next) => {
    const { slug } = req.params
    Category.findOne({ slug: slug })
        .select("_id")
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ error })
            }
            if (category) {
                Product.find({ category: category._id })
                    .exec((error, products) => {
                        if (error) {
                            return res.status(400).json({ error })
                        }
                        if (products.length > 0) {
                            return res.status(200).json({
                                products,
                                productsByPrice: {
                                    under5k: products.filter(prod => prod.price <= 5000),
                                    under10k: products.filter(prod => prod.price > 5000 && prod.price <= 10000),
                                    under15k: products.filter(prod => prod.price > 10000 && prod.price <= 15000),
                                    under20k: products.filter(prod => prod.price > 15000 && prod.price <= 20000),
                                }
                            })
                        }
                    })
            }
        })
}

exports.getProductById = (req, res, next) => {
    const prodId = req.params.prodId
    if (prodId) {
        Product.findOne({ _id: prodId })
            .exec((error, product) => {
                if (error) return res.status(400).json({ error })
                if (product) return res.status(200).json({ product })
            })
    } else {
        return res.status(400).json({ message: "Product Id Required" });
    }
}