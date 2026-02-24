import BookDao, { IBookModel } from "../daos/BookDao";
import { IBook } from "../models/Book";
import { IPagination } from "../models/Pagination";
import { BookDoesNotExistError } from "../utils/LibraryError";


export async function findAllBooks():Promise<IBookModel[]>{
    return await BookDao.find()
}

export async function findBookById(id:string):Promise<IBookModel>{
    try{
        let book =await BookDao.findById(id)
        if(book) return book
        throw new BookDoesNotExistError("Book does not exist with this ID")
    }catch(error:any){
     throw error   
    }
}

export async function modifyBook(book:IBookModel):Promise<IBookModel>{
    try{
        let updatedBook  =await BookDao.findOneAndUpdate({barcode:book.barcode},book,{new:true})
        if(! updatedBook) {
      throw new BookDoesNotExistError("Book does not exist with this barcode");
    }

    // console.log("Updated book in DB:", updatedBook);
    return updatedBook;
    }catch(error:any){
        throw error
    }
}

export async function registerBook(book:IBook):Promise<IBookModel>{
    const savedBook = new BookDao(book)
    return await savedBook.save()
}

export async function removeBook(barcode:string):Promise<string>{
    try{
        let deleted =await BookDao.findOneAndDelete({barcode})
        if(! deleted) throw new BookDoesNotExistError("Book does not exist with this ID")
        return "Book deleted successfully"
    }catch(error:any){
        throw error
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
export async function queryBooks(
  page = 1,
  limit = 25,
  title?: string,
  barcode?: string,
  description?: string,
  author?: string,
  subject?: string,
  genre?: string
): Promise<IPagination<IBookModel>> {
  const orFilters: any[] = [];

  if (barcode) orFilters.push({ barcode: { $regex: barcode, $options: "i" } });
  if (title) orFilters.push({ title: { $regex: title, $options: "i" } });
  if (description) orFilters.push({ description: { $regex: description, $options: "i" } });
  if (author) orFilters.push({ authors: { $elemMatch: { $regex: author, $options: "i" } } });
  if (subject) orFilters.push({ subjects: { $elemMatch: { $regex: subject, $options: "i" } } });
  if (genre) orFilters.push({ genre: { $regex: genre, $options: "i" } });

  const filter = orFilters.length > 0 ? { $or: orFilters } : {};

  const skip = (page - 1) * limit;
  const items = await BookDao.find(filter).skip(skip).limit(limit);
  const totalCount = await BookDao.countDocuments(filter);
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

export function paginateBooks(books:IBookModel[],page:number,limit:number):IPagination<IBookModel>{
    let pageBooks:IBookModel[]=[]
    const pages=Math.ceil(books.length/Number(limit))
    if(Number(page)===pages){
        const startPoint = (Number(page)-1)*Number(limit)
        pageBooks=books.slice(startPoint)
    }else{
        const startPoint = (Number(page)-1)*Number(limit)
        const endPoint=startPoint+Number(limit)
        pageBooks=books.slice(startPoint,endPoint)
    }
    const pageObject={
        totalCount:books.length,
        currentPage:Number(page),
        totalPages:pages,
        limit:Number(limit),
        pageCount:pageBooks.length,
        items:pageBooks
    }
    return pageObject
}