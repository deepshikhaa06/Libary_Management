"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllBooks = findAllBooks;
exports.findBookById = findBookById;
exports.modifyBook = modifyBook;
exports.registerBook = registerBook;
exports.removeBook = removeBook;
exports.queryBooks = queryBooks;
exports.paginateBooks = paginateBooks;
const BookDao_1 = __importDefault(require("../daos/BookDao"));
const LibraryError_1 = require("../utils/LibraryError");
async function findAllBooks() {
    return await BookDao_1.default.find();
}
async function findBookById(id) {
    try {
        let book = await BookDao_1.default.findById(id);
        if (book)
            return book;
        throw new LibraryError_1.BookDoesNotExistError("Book does not exist with this ID");
    }
    catch (error) {
        throw error;
    }
}
async function modifyBook(book) {
    try {
        let updatedBook = await BookDao_1.default.findOneAndUpdate({ barcode: book.barcode }, book, { new: true });
        if (!updatedBook) {
            throw new LibraryError_1.BookDoesNotExistError("Book does not exist with this barcode");
        }
        // console.log("Updated book in DB:", updatedBook);
        return updatedBook;
    }
    catch (error) {
        throw error;
    }
}
async function registerBook(book) {
    const savedBook = new BookDao_1.default(book);
    return await savedBook.save();
}
async function removeBook(barcode) {
    try {
        let deleted = await BookDao_1.default.findOneAndDelete({ barcode });
        if (!deleted)
            throw new LibraryError_1.BookDoesNotExistError("Book does not exist with this ID");
        return "Book deleted successfully";
    }
    catch (error) {
        throw error;
    }
}
// export async function queryBooks(page?:number,limit?:number,title?:string,barcode?:string,description?:string,author?:string,subject?:string,genre?:string):Promise<IPagination<IBookModel>>{
//     let books:IBookModel[]=await BookDao.find()
//     let filteredBooks:IBookModel[]=[]
//     books.forEach((book)=>{
//         if(barcode){
//             if(book.barcode.toLowerCase().includes(barcode.toLowerCase()) && !filteredBooks.some(b=>b['barcode']===book.barcode)){
//                 filteredBooks.push(book)
//             } 
//         }
//         if(title){
//             if(book.title.toLowerCase().includes(title.toLowerCase()) && !filteredBooks.some(b=>b['barcode']===book.barcode)){
//                 filteredBooks.push(book)
//             } 
//         }
//         if(description){
//             if(book.description.toLowerCase().includes(description.toLowerCase()) && !filteredBooks.some(b=>b['barcode']===book.barcode)){
//                 filteredBooks.push(book)
//             } 
//         }
//         if(author){
//             if(book.authors.some(a=>a.toLowerCase().includes(author.toLowerCase())) && !filteredBooks.some(b=>b['barcode']===book.barcode)){
//                 filteredBooks.push(book)
//             } 
//         }
//         if(subject){
//             if(book.subjects.some(s=>s.toLowerCase().includes(subject.toLowerCase())) && !filteredBooks.some(b=>b['barcode']===book.barcode)){
//                 filteredBooks.push(book)
//             } 
//         }
//         if(genre){
//             if(book.genre.toLowerCase().includes(genre.toLowerCase()) && !filteredBooks.some(b=>b['barcode']===book.barcode)){
//                 filteredBooks.push(book)
//             }
//         }
//     })
//     return paginateBooks(filteredBooks,page ?? 1, limit ?? 10)
// }
// BookService.ts
async function queryBooks(page = 1, limit = 25, title, barcode, description, author, subject, genre) {
    const orFilters = [];
    if (barcode)
        orFilters.push({ barcode: { $regex: barcode, $options: "i" } });
    if (title)
        orFilters.push({ title: { $regex: title, $options: "i" } });
    if (description)
        orFilters.push({ description: { $regex: description, $options: "i" } });
    if (author)
        orFilters.push({ authors: { $elemMatch: { $regex: author, $options: "i" } } });
    if (subject)
        orFilters.push({ subjects: { $elemMatch: { $regex: subject, $options: "i" } } });
    if (genre)
        orFilters.push({ genre: { $regex: genre, $options: "i" } });
    const filter = orFilters.length > 0 ? { $or: orFilters } : {};
    const skip = (page - 1) * limit;
    const items = await BookDao_1.default.find(filter).skip(skip).limit(limit);
    const totalCount = await BookDao_1.default.countDocuments(filter);
    // console.log("Mongo Filter:", filter);
    // console.log("Books Found:", items.length);
    return {
        currentPage: page,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        limit,
        pageCount: items.length,
        items,
    };
}
function paginateBooks(books, page, limit) {
    let pageBooks = [];
    const pages = Math.ceil(books.length / Number(limit));
    if (Number(page) === pages) {
        const startPoint = (Number(page) - 1) * Number(limit);
        pageBooks = books.slice(startPoint);
    }
    else {
        const startPoint = (Number(page) - 1) * Number(limit);
        const endPoint = startPoint + Number(limit);
        pageBooks = books.slice(startPoint, endPoint);
    }
    const pageObject = {
        totalCount: books.length,
        currentPage: Number(page),
        totalPages: pages,
        limit: Number(limit),
        pageCount: pageBooks.length,
        items: pageBooks
    };
    return pageObject;
}
