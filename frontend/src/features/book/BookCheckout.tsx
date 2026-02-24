import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/ReduxStore"
import { checkoutBook, setCurrentBook } from "../../redux/slices/BookSlice"
import { setDisplayLoan } from "../../redux/slices/ModalSlice"


export const BookCheckout:React.FC=()=>{
    const user = useSelector((state:RootState) => state.authentication.loggedInUser)
    const book = useSelector((state:RootState) => state.book.currentBook)
    const libraryCardRef= useRef<HTMLInputElement>(null);
    const dispatch:AppDispatch=useDispatch()

    const checkout= (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(book && user && libraryCardRef.current){
            dispatch(checkoutBook({book, employee:user, libraryCard:libraryCardRef.current.value}))
        }
        dispatch(setCurrentBook(undefined))
        dispatch(setDisplayLoan(false))
    }

    return(
        <div className="flex justify-center items-center min-h-50vh bg-gray-100">
  {book && user && (
    <form
      className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col gap-5"
    >
      <h3 className="text-2xl font-semibold text-gray-800 text-center">
        Loan Book Title: <span className="text-blue-600">{book.title}</span>
      </h3>

      <h4 className="text-gray-700 text-lg font-medium">
        Enter patron library card number:
      </h4>

      <input
        ref={libraryCardRef}
        placeholder="Library Card ID"
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={checkout}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Loan Book
      </button>
    </form>
  )}
</div>

    )
}