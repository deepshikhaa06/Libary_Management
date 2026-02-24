"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BookService_1 = require("../services/BookService");
const LibraryError_1 = require("../utils/LibraryError");
async function getAllBooks(req, res) {
    try {
        let books = await (0, BookService_1.findAllBooks)();
        res.status(200).json({ message: "Books fetched successfully", count: books.length, books });
    }
    catch (error) {
        res.status(500).json({ message: "Unable to get books at this time", error: error.message });
    }
}
async function createBook(req, res) {
    let book = req.body;
    try {
        let createdBook = await (0, BookService_1.registerBook)(book);
        res.status(201).json({ message: "Book created successfully", createdBook });
    }
    catch (error) {
        res.status(500).json({ message: "Unable to create book at this time", error: error.message });
    }
}
async function updateBook(req, res) {
    let book = req.body;
    try {
        let updatedBook = await (0, BookService_1.modifyBook)(book);
        res.status(200).json({ message: "Book updated successfully", updatedBook });
    }
    catch (error) {
        if (error instanceof LibraryError_1.BookDoesNotExistError) {
            res.status(404).json({ message: "Can not update book successfully" });
        }
        else {
            res.status(500).json({ message: "Unable to update book at this time", error: error.message });
        }
    }
}
async function deleteBook(req, res) {
    let { barcode } = req.params;
    try {
        let message = await (0, BookService_1.removeBook)(barcode);
        res.status(200).json({ message });
    }
    catch (error) {
        if (error instanceof LibraryError_1.BookDoesNotExistError) {
            res.status(404).json({ message: "Can not delete book successfully" });
        }
        else {
            res.status(500).json({ message: "Unable to delete book at this time", error: error.message });
        }
    }
}
async function searchForBookByQuery(req, res) {
    let { title, barcode, description, author, subject, genre, page = 1, limit = 25 } = req.query;
    // console.log("Query Params:", req.query);
    let books = await (0, BookService_1.queryBooks)(Number(page), Number(limit), title, barcode, description, author, subject, genre);
    res.status(200).json({ message: "Books fetched successfully", page: books });
}
exports.default = { getAllBooks, createBook, updateBook, deleteBook, searchForBookByQuery };
