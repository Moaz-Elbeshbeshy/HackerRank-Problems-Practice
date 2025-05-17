const fs = require('fs').promises
const path = require('path')

const bookMiddleware = async (req, res, next) => {
    try {
        const filePath = path.resolve(__dirname, '../data/books.json')
        const books = await fs.readFile(filePath, 'utf8')
        const booksList = JSON.parse(books)

        let page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 3
        const genre = req.query.genre || ''
        const year = req.query.year || ''
        const author = req.query.author || ''
        const sortBy = req.query.sortBy || ''
        const searchTerm = req.query.q || ''

        page = Math.max(1, page)
        limit = Math.max(1, limit)

        const skip = (page - 1) * limit

        const titleSearch = searchTerm ? new RegExp(searchTerm, 'i') : null
        const yearSearch = year ? new RegExp(year, 'i') : null
        const genreSearch = genre ? new RegExp(genre, 'i') : null
        const authorSearch = author ? new RegExp(author, 'i') : null

        let results = [...booksList]
        if (titleSearch) {
            results = results.filter(({ title }) => titleSearch.test(title))
        }
        if (yearSearch) {
            results = results.filter(({ year }) => yearSearch.test(year))
        }
        if (genreSearch) {
            results = results.filter(({ genre }) => genreSearch.test(genre))
        }
        if (authorSearch) {
            results = results.filter(({ author }) => authorSearch.test(author))
        }

        const total = results.length

        results.sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title)
            } else if (sortBy === 'year') {
                return a.year - b.year
            }
            return 0
        })

        const paginatedResults = results.slice(skip, skip + limit)

        req.context = {
            page,
            limit,
            skip,
            total,
            data: paginatedResults
        }

        next()

    } catch (error) {
        console.error(error)
        res.status(500).json({ err: error.message })
    }

}








module.exports = bookMiddleware