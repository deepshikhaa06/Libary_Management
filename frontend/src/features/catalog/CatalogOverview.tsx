import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/ReduxStore"
import { useEffect, useState } from "react"
import { fetchAllBooks } from "../../redux/slices/BookSlice"
import { generateRandomGenres, getRandomBookByGenre} from "./utils/CatalogUtils"
import { CatalogOverviewSection } from "./CatalogOverviewSection"

export const CatalogOverview:React.FC = () => {
    const bookState = useSelector((state:RootState)=> state.book)
    const dispatch:AppDispatch = useDispatch()

    const [genres,setGenres] = useState<string[]>(()=>{
        return generateRandomGenres()
    })

    useEffect(() => {
        //   console.log("bookState updated:", bookState)
        dispatch(fetchAllBooks())
    },[])
    return (
        <>
  {bookState.loading && (
    <p className="text-gray-500 text-center text-lg animate-pulse mt-10">
      Loading books...
    </p>
  )}

  {bookState.books.length > 0 && !bookState.loading ? (
    <div className="text-center mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-indigo-700">
        Welcome to our Library!
      </h2>
      <p className="text-gray-700 text-lg">
        We currently have{" "}
        <span className="font-semibold text-indigo-600">
          {bookState.books.length}
        </span>{" "}
        books.
      </p>
      <h4 className="text-gray-600 text-base">
        Browse our selected books below or search for something using the top navigation bar.
      </h4>
      {genres.map((genre) => {
        return <CatalogOverviewSection key={genre} books={getRandomBookByGenre(genre,bookState.books)} label={genre} />
      })}
    </div>
  ) : (
    <></>
  )}
</>
)
}