import { useNavigate } from "react-router-dom"
import { mapAuthorsToString } from "./utils/BookUtils"
import type { Book } from "../../models/Book"
import type { AppDispatch, RootState } from "../../redux/ReduxStore"
import { useEffect, useState } from "react"
import { setCurrentBook } from "../../redux/slices/BookSlice"
import { setDisplayLoan } from "../../redux/slices/ModalSlice"
import { useDispatch, useSelector } from "react-redux"

interface BookCardProps{
    book:Book
}

export const BookCard : React.FC<BookCardProps> = ({book}) => {
    const user = useSelector((state:RootState) => state.authentication.loggedInUser)
    const  navigate = useNavigate()
    const dispatch:AppDispatch=useDispatch()
    const [available , setAvailable] = useState<boolean>(()=>{
      if(book.records.length === 0) return true
      return book.records[0].status==="AVAILABLE"
    })
    const [buttonClass, setButtonClass] = useState<string>("")

    const handleLoan = (e:React.MouseEvent<HTMLButtonElement>) =>{
      e.preventDefault()
      if(user?.type === "EMPLOYEE"){
        dispatch(setCurrentBook(book))
        dispatch(setDisplayLoan(true))
      } else {
    alert("Only employees can loan books!");
  }
    }
    const displayBook = () =>{navigate(`/resource/${book.barcode}`)}

    useEffect(()=>{
      let c = "book-card-loan-button"
      if(available){
       c+="available" 
      }else{
        c+="unavailable"
      }
      if(user && user.type === "EMPLOYEE"  && available){
        c+="checkout"
      }else if(user && user.type === "EMPLOYEE" && !available){
       c+="checkin" 
      }
      setButtonClass(c)
    },[available,user?.type,book.records])

    return (
        <div
      onClick={displayBook}
      className="cursor-pointer flex flex-col bg-white/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden w-70 sm:w-64 min-h-[420px] hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
    >
      {/* Book Cover */}
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-80 object-cover border-b border-gray-200"
      />

      {/* Book Info */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
          {book.title}
        </h3>
        <h4 className="text-xs text-blue-600 italic mt-1 line-clamp-1">
          {mapAuthorsToString(book)}
        </h4>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {book.description}
        </p>
      </div>
      <button onClick={(e) => {
    e.stopPropagation();  // prevent navigating away
    handleLoan(e);
  }} className={`px-5 py-2 rounded-lg font-medium text-white transition ${available ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"}`
  } >Status:{available?"Available":"Unavailable"}</button>
    </div>
    )

}