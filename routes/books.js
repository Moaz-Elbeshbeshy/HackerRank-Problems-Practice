const express = require('express')
const router = express.Router()
const bookMiddleware = require('../middleware/bookMiddleware')

router.route('/').get(bookMiddleware, (req, res) => {
    const {
        page,
        limit,
        skip,
        total,
        data
    } = req.context
    console.log(data)
    res.status(200).json({ page, limit, skip, total, data })
})







module.exports = router