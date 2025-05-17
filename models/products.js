const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
    },
    mrp: {
        type: Number,
        required: [true, 'Please provide max retail price'],
    },
    stock: {
        type: Number,
        required: [true, 'Please provide stock'],
    },
    isPublished: {
        type: Boolean,
        default: false
    },
}, { timestamps: false })


module.exports = mongoose.model('Product', productSchema)