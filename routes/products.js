const express = require('express')
const router = express.Router()
const { getAllProducts, putProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products')

router.route('/').post(createProduct).get(getAllProducts)
router.route('/:id').patch(updateProduct).put(putProduct).delete(deleteProduct)

module.exports = router