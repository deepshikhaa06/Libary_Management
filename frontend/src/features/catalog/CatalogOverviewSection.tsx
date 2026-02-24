import { useSelector } from "react-redux";
import { BookCarousel } from "../book";
import type { RootState } from "../../redux/ReduxStore";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../models/Book";


interface CatalogOverviewSectionProps {
    books:Book[];
    label:string   
}

export const CatalogOverviewSection : React.FC<CatalogOverviewSectionProps> = ({books,label}) => {
    const  bookState=useSelector((state:RootState)=> state.book)
    const navigate= useNavigate()
    const handleViewMore=()=>{navigate(`/catalog?genre=${label}&subject=${label}`)}

    return  (
        <div className="w-full max-w-6xl mx-auto mt-10">
  {/* Header Section */}
  <div className="flex items-center justify-between mb-4 px-2">
    <h4 className="text-xl font-semibold text-gray-800">{label}</h4>
    <p
      onClick={handleViewMore}
      className="text-blue-600 text-sm font-medium cursor-pointer hover:underline hover:text-blue-700 transition"
    >
      View More
    </p>
  </div>

  {/* Carousel Section */}
  {books.length > 0 && !bookState.loading && (
    <div className="w-full">
      <BookCarousel books={books} />
    </div>
  )}
</div>

    )
}