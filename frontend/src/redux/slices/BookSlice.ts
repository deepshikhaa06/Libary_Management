import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, CheckoutBookPayload , CheckinBookPayload } from "../../models/Book";
import axios from "axios";
import type { PageInfo } from "../../models/Page";

interface BookSliceState {
    books: Book[];
    loading: boolean;
    error: boolean;
    currentBook:Book | undefined
    pagingInformation:PageInfo | null
}


const initialState: BookSliceState = {
    books: [],
    loading: false,
    error: false,
    currentBook: undefined,
    pagingInformation: null
};

export const fetchAllBooks = createAsyncThunk('book/all',async(payload,thunkAPI)=>{
    try {
        const res = await axios.get("http://localhost:8080/book")
        return res.data.books
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
    }
}
)

export const queryBooks = createAsyncThunk('book/query',async(payload:string,thunkAPI)=>{
    try{
        // console.log("QUERY PAYLOAD:", payload)
        let res = await axios.get(`http://localhost:8080/book/query${payload}`)
        // console.log("QUERY RESULT:", res.data)
        return res.data.page
    }catch(error:any){
        return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
})

export const checkoutBook = createAsyncThunk('book/checkout',async(payload:CheckoutBookPayload,thunkAPI)=>{
    try {
        const returnDate = new Date()
        returnDate.setDate(returnDate.getDate() + 14)
        const getPatron = await axios.get(`http://localhost:8080/card/${payload.libraryCard}`)
        let patronId = getPatron.data.libraryCard.user._id
        const record = {
            status:"LOANED",
            loanedDate:new Date(),
            dueDate:returnDate,
            patron:patronId,
            employeeOut:payload.employee._id,
            item:payload.book._id
        }
        const loanReq = await axios.post(`http://localhost:8080/loan`,record)
        const loan = loanReq.data.record
        return loan
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const checkinBook = createAsyncThunk('book/checkin',async(payload:CheckinBookPayload,thunkAPI)=>{
    try {
        let record=payload.book.records[0]
        let updateRecord = {
            status:"AVAILABLE",
            loanedDate:record.loanedDate,
            dueDate:record.dueDate,
            returnedDate:new Date(),
            patron:record.patron,
            employeeIn:payload.employee._id,
            employeeOut:record.employeeOut,
            item:record.item,
            _id:record._id
        }
        let loan  = await axios.put(`http://localhost:8080/loan`,updateRecord)
        return loan.data.record
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const loadBookByBarcode=createAsyncThunk('book/id',async(payload:string,thunkAPI)=>{
    try {
        let res=await axios.get(`http://localhost:8080/book/query?barcode=${payload}`)
        let book = res.data.page.items[0]
        if(!book||book.barcode!==payload){
            throw new Error("Book not found")
        }
        return book
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const BookSlice= createSlice({
    name:"book",
    initialState,
    reducers:{
        setCurrentBook:(state,action:PayloadAction<Book | undefined>)=>{
            state={
                ...state,
                currentBook:action.payload
            }
            return state
        }
    },
    extraReducers:(builder)=>{
        //!Pending
        builder.addCase(fetchAllBooks.pending,(state)=>{
            state={
                ...state,
                loading : true,
                books:[]
            }
            return  state
        })
        builder.addCase(queryBooks.pending,(state)=>{
            state={
                ...state,
                loading : true,
                books:[]
            }
            return  state
        })
        builder.addCase(checkoutBook.pending,(state)=>{
            state={
                ...state,
                loading : true
            }
            return  state
        })
        builder.addCase(checkinBook.pending,(state)=>{
            state={
                ...state,
                loading : true
            }
            return  state
        })
        builder.addCase(loadBookByBarcode.pending,(state)=>{
            state={
                ...state,
                loading : true
            }
            return  state
        })

        //!Fulfilled
        builder.addCase(fetchAllBooks.fulfilled,(state,action)=>{
            state={
                ...state,
                loading : false,
                books:action.payload
            }
            return  state
        })
        builder.addCase(queryBooks.fulfilled,(state,action)=>{
            state={
                ...state,
                loading : false,
                books:action.payload.items,
                pagingInformation:{
                    currentPage:action.payload.currentPage,
                    totalCount:action.payload.totalCount,
                    totalPages:action.payload.totalPages,
                    limit:action.payload.limit,
                    pageCount:action.payload.pageCount
                }
            }
            return  state
        })
        builder.addCase(checkoutBook.fulfilled,(state,action)=>{
            let bookList:Book[] = JSON.parse(JSON.stringify(state.books))
            bookList = bookList.map((book)=>{
                if(book._id===action.payload.item){
                 book.records = [action.payload,...book.records]   
                 return book
                }
                return book
            })
            state={
                ...state,
                loading : false,
                books:bookList
            }
            return  state
        })
        builder.addCase(checkinBook.fulfilled,(state,action)=>{
            state.books = state.books.map(book => {
        if (book._id === action.payload.item) {
            const newRecords = [...book.records]
            newRecords.splice(0, 1, action.payload)
            return { ...book, records: newRecords }
        }
        return book
    })
    state.loading = false
        })
        builder.addCase(loadBookByBarcode.fulfilled,(state,action)=>{
            state={
                ...state,
                loading : false,
                currentBook:action.payload
            }
            return  state
        })


        //!Rejected
        builder.addCase(queryBooks.rejected, (state) => {
         state.loading = false;
         state.error = true;
        });
        builder.addCase(fetchAllBooks.rejected, (state) => {
         state.loading = false;
         state.error = true;
        });
        builder.addCase(loadBookByBarcode.rejected, (state) => {
            state={
                ...state,
                loading : false,
                error : true
            }
            return  state
        })

    }
})

export const {setCurrentBook}= BookSlice.actions

export default BookSlice.reducer