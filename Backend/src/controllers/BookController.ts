import { findAllBooks, modifyBook, queryBooks, registerBook, removeBook } from "../services/BookService"
import { Request,Response } from "express"
import { BookDoesNotExistError } from "../utils/LibraryError"

async function getAllBooks(req:Request,res:Response){
    try {
        let books = await findAllBooks()
        res.status(200).json({message:"Books fetched successfully",count:books.length,books})       
    } catch (error:any) {
        res.status(500).json({message:"Unable to get books at this time",error:error.message})
    }
}
async function createBook(req:Request,res:Response){
    let book = req.body
    try {
        let createdBook = await registerBook(book)
        res.status(201).json({message:"Book created successfully",createdBook})       
    } catch (error:any) {
        res.status(500).json({message:"Unable to create book at this time",error:error.message})
    }
}

async function updateBook(req:Request,res:Response){
    let book = req.body
    try {
        let updatedBook = await modifyBook(book)
        res.status(200).json({message:"Book updated successfully",updatedBook})       
    } catch (error:any) {
        if(error instanceof BookDoesNotExistError){
            res.status(404).json({message:"Can not update book successfully"})
        }else{
            res.status(500).json({message:"Unable to update book at this time",error:error.message})
        }
    }
}

async function deleteBook(req:Request,res:Response){
    let {barcode} = req.params
    try {
        let message = await removeBook(barcode)
        res.status(200).json({message})       
    } catch (error:any) {
        if(error instanceof BookDoesNotExistError){
            res.status(404).json({message:"Can not delete book successfully"})
        }else{
            res.status(500).json({message:"Unable to delete book at this time",error:error.message})
        }
    }
}

async function searchForBookByQuery(req:Request,res:Response){
    let {title,barcode,description,author,subject,genre,page=1,limit=25}=req.query
    // console.log("Query Params:", req.query);

    let books=await queryBooks(
        Number(page),
        Number(limit),
        title as string,
        barcode as string,
        description as string,
        author as string,
        subject as string,
        genre as string
    )
    res.status(200).json({message:"Books fetched successfully",page:books})
}

export default {getAllBooks,createBook,updateBook,deleteBook,searchForBookByQuery}