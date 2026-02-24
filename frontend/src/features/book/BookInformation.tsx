import type React from "react"
import type { Book } from "../../models/Book"
import { mapAuthorsToString } from "./utils/BookUtils"

interface BookInfoProps {
    book:Book
}

export const BookInformation : React.FC<BookInfoProps> = ({book}) => {
    return(
        <div className="flex flex-col md:flex-row items-start justify-center gap-8 bg-white rounded-2xl shadow-lg p-6 max-w-5xl mx-auto mt-10">
      {/* Book Cover */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={book.cover}
          alt={book.title}
          className="rounded-xl shadow-md w-64 h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Book Details */}
      <div className="flex-1 space-y-4 text-gray-800">
        <h2 className="text-3xl font-bold text-blue-700">{book.title}</h2>
        <h3 className="text-lg font-semibold text-gray-600">
          {mapAuthorsToString(book)}
        </h3>
        <p className="text-gray-700 leading-relaxed text-justify">
          {book.description}
        </p>
      </div>
    </div>
    )   
}