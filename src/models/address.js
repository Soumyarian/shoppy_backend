const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 60
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: String,
        required: true,
        trim: true
    },
    locality: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 100
    },
    address: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 100
    },
    cityDistrictTown: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    landmark: {
        type: String,
        min: 5,
        max: 20
    },
    alternativePhone: {
        type: String,
    },
    addressType: {
        type: String,
        enum: ['home', 'work'],
        required: true
    }
})

const userAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: [addressSchema]
}, { timestamps: true })

module.exports = mongoose.model('UserAddress', userAddressSchema);