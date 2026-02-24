import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/ReduxStore"
import { checkinBook, setCurrentBook } from "../../redux/slices/BookSlice"
import { setDisplayLoan } from "../../redux/slices/ModalSlice"


export const BookCheckin:React.FC= () => {
    const book = useSelector((state:RootState) => state.book.currentBook)
    const user = useSelector((state:RootState) => state.authentication.loggedInUser)
    const dispatch:AppDispatch=useDispatch()

    const checkin= (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(book && user){
            dispatch(checkinBook({book, employee:user}))
        }
        dispatch(setCurrentBook(undefined))
        dispatch(setDisplayLoan(false))
    }

    return(
    <div className="flex justify-center items-center min-h-50vh bg-gray-100">
  {book && user && (
    <form
      className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Check In Book Title:{" "}
        <span className="text-blue-600">{book.title}</span>
      </h3>

      <div className="mb-4">
        <h4 className="text-lg font-medium text-gray-700 mb-2">
          Check In Employee ID:
        </h4>
        <input
          value={user._id}
          disabled
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
        />
      </div>

      <button
        onClick={checkin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
      >
        Check In Book
      </button>
    </form>
  )}
</div>

    )
}