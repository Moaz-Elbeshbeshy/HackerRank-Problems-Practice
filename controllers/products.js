const Product = require('../models/products')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllProducts = async (req, res) => {
    let allProducts = await Product.find({}).sort({ _id: 1 })
    res.status(StatusCodes.OK).json(allProducts)
}

const createProduct = async (req, res) => {
    const { name, price, mrp, stock } = req.body
    try {
        const product = await Product.create({ name, price, mrp, stock, isPublished: false })
        res.status(StatusCodes.CREATED).json(product)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        let errors = []

        let product = await Product.findById(id)

        if (!product) {
            throw new NotFoundError('Product not found')
        }

        if (product.mrp < product.price) {
            errors.push('MRP should not be less than equal to the Price')
        }

        if (product.stock <= 0) {
            errors.push('Stock count is 0')
        }

        if (errors.length > 0) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(errors)
        }

        if (product.mrp >= product.price && product.stock > 0) {
            product.isPublished = true
            await product.save()
            return res.status(StatusCodes.NO_CONTENT).end()
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message })
    }

}

const putProduct = async (req, res) => {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send()
}
const deleteProduct = async (req, res) => {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send()
}


module.exports = {
    getAllProducts,
    putProduct,
    createProduct,
    updateProduct,
    deleteProduct
}



