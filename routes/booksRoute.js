const express = require('express')
const router = express.Router()
const {getAllBooks, getBookbyId, addNewBook, editBook,getBook} = require('../controllers/books')

//Get all the books
router.get('/', getAllBooks)
// Get book by id
router.route('/:id').get(getBook,getBookbyId)
//Add new book
router.post('/add', addNewBook)
//Edit a book
router.route('/edit/:id').patch(getBook, editBook)

module.exports = router