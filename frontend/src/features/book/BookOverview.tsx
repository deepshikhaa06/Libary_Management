import { useSelector } from "react-redux"
import { BookInformation } from "./BookInformation"
import type { RootState } from "../../redux/ReduxStore"
import { BookSubjects } from "./BookSubjects"
import { BookAdditionalInfo } from "./BookAdditionalInfo"
import { BookHistory } from "./BookHistory"


export const BookOverview:React.FC = () => {
    const bookState=useSelector((state:RootState)=> state.book)
    const user = useSelector((state:RootState) => state.authentication.loggedInUser)

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            {bookState.currentBook && !bookState.loading &&
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200 transition-all duration-300 hover:shadow-xl">
            <BookInformation book={bookState.currentBook}/>
            <BookSubjects subjects={bookState.currentBook.subjects} />
            <BookAdditionalInfo book={bookState.currentBook}/>
            {user?.type==='EMPLOYEE' && <BookHistory book={bookState.currentBook}/>}
            </div>
            }
        </div>
    )
}