const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    isbn_number:{
        type : Number,
        required : true,
        unique :true, 
    },
    book_name:{
        type: String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    published_date:{
        type: Date,
        default: Date.now() 
    },
    genre:{
        type: String,
        required : true
    },
    status:{
        type: String,
    }
});

module.exports = mongoose.model('bookModel', booksSchema)