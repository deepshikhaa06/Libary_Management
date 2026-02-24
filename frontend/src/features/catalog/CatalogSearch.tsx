import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { queryBooks } from "../../redux/slices/BookSlice"
import type { AppDispatch, RootState } from "../../redux/ReduxStore"
import { useLocation } from "react-router-dom"
import { BookCard } from "../book"
import { CatalogAdvanceSearch } from "./CatalogAdvanceSearch"
import { CatalogSearchPageNavigator } from "./CatalogSearchPageNavigator"


export const CatalogSearch:React.FC = () => {
    const bookState = useSelector((state:RootState)=> state.book)
    const dispatch:AppDispatch = useDispatch()
    const location = useLocation()

//     console.log("Books from Redux:", bookState.books);
// console.log("Paging info:", bookState.pagingInformation);

    useEffect(() => {
        dispatch(queryBooks(location.search))
    },[location.search])
    return (
        <div className="w-full max-w-6xl mx-auto mt-10 px-4">
  {/* Top spacing div */}
  <div className="mb-6">
    <CatalogAdvanceSearch/>
  </div>

  {!bookState.loading ? (
    <>
      {/* Header Text */}
      <h2 className="text-lg md:text-xl font-semibold text-center text-gray-800 mb-6">
        Displaying{" "}
        <span className="text-indigo-600">
          {bookState.pagingInformation?.pageCount}
        </span>{" "}
        books out of{" "}
        <span className="text-indigo-600">
          {bookState.pagingInformation?.totalCount}
        </span>
      </h2>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {bookState.books.map((book) => (
          <BookCard key={book.barcode} book={book} />
        ))}
      </div>

      {/* Bottom spacing div */}
      <div className="mt-10">
        <CatalogSearchPageNavigator/>
      </div>
    </>
  ) : (
    <p className="text-gray-500 text-center text-lg animate-pulse mt-10">
      Loading books...
    </p>
  )}
</div>

    )
}