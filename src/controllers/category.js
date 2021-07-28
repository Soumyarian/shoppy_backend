const slugify = require('slugify');
const Category = require('./../models/category');

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId === null) {
        category = categories.filter(cat => cat.parentId === undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            type: cat.type ? cat.type : '',
            parentId: cat.parentId,
            categoryImage: cat.categoryImage,
            children: createCategories(categories, cat._id)
        })
    }

    return categoryList;
}

exports.postCreateCategory = (req, res, next) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if (req.files.length > 0) {
        const categoryImage = req.files.map(file => {
            return { img: file.filename }
        })
        categoryObj.categoryImage = categoryImage;
    }
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (category) {
            return res.status(200).json({ category })
        }
    })
}

exports.getCategories = (req, res, next) => {
    Category.find()
        .exec((error, categories) => {
            if (error) {
                return res.status(400).json({ error })
            }
            if (categories) {
                const categoryList = createCategories(categories)
                return res.status(200).json({ categoryList })
            }
        })
}

exports.postUpdateCategories = async (req, res, next) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            }
            if (parentId[i] !== 'undefined') {
                category.parentId = parentId[i]
            }
            const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({ updatedCategories })
    } else {
        const category = {
            name,
            type
        }
        if (parentId !== 'undefined') {
            category.parentId = parentId
        }
        const updatedCategory = await Category.findOneAndUpdate({ _id: _id }, category, { new: true });
        updatedCategories.push(updatedCategory);
        return res.status(201).json({ updatedCategories })
    }
}

exports.postDeleteCategories = async (req, res, next) => {
    const { ids } = req.body;
    const deletedCategories = []
    for (let i = 0; i < ids.length; i++) {
        const category = await Category.findOneAndDelete({ _id: ids[i] });
        deletedCategories.push(category);
    }
    if (deletedCategories.length === ids.length) {
        return res.status(200).json({ message: 'deleted successfully' })
    } else {
        return res.status(400).json({ message: 'error' });
    }
}