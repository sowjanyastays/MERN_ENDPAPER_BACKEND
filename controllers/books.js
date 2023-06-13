const express = require('express')
const bookModel = require('../models/bookListModel')

const getAllBooks = async(request,response)=>{
    try
    {
        const books = await bookModel.find()
        response.status(200).json(books)
    }
    catch(error){
        response.status(500).json({message:error.message})
    }
}

const getBookbyId = (request, response)=>{
    response.status(200).json(response.book)
}

const addNewBook = async(request, response)=>{
    const newBook = new bookModel({
        isbn_number: request.body.isbn_number,
        book_name : request.body.book_name,
        author : request.body.author,
        published_date : request.body.published_date,
        genre: request.body.genre,
        status : request.body.status
    });
    try{
        const book = await newBook.save()
        response.status(201).json(book)
    }
    catch(error){
        response.status(500).json({message:error.message})
    }
}

const editBook = async(request, response)=>{
    if(request.body.book_name!=null){
        response.book.book_name = request.body.book_name;
    }
    if(request.body.auhtor!=null){
        response.book.author = request.body.author;
    }
    if(request.body.published_name!=null){
        response.book.published_date = request.body.published_date;
    }
    if(request.body.genre!=null){
        response.book.genre = request.body.genre;
    }
    if(request.body.status!=null){
        response.book.status = request.body.status;
    }
    try{
        const updateBook = await response.book.save()
        response.status(201).json(updateBook)
    }
    catch(error){
        response.status(400).json({message:error.message})
    }
}

async function getBook(request,response,next){
    let book;
    try{
        book = await bookModel.findOne({isbn_number:request.params.id})
        if(book===null){
            response.status(404).send({message: `Cannot find book with id ${request.params.id}`})
        }
    }
    catch(error){
        return response.status(500).send({message:error.message})
    }
    response.book = book;
    next();
}

module.exports = {getAllBooks, getBookbyId, addNewBook, editBook,getBook}
