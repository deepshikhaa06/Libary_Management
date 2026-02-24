import type { Book } from "../../models/Book"

interface BookAdditionalInfoProps{
    book:Book
}

export const BookAdditionalInfo:React.FC<BookAdditionalInfoProps> = ({book}) => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 mt-6">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
    Additional Information about:{" "}
    <span className="text-blue-600">{book.title}</span>
  </h2>
  <div className="space-y-2 text-gray-700">
    <p>
      <span className="font-medium text-gray-900">Published By:</span>{" "}
      {book.publisher}
    </p>
    <p>
      <span className="font-medium text-gray-900">Publication Date:</span>{" "}
      {new Date(book.publicationDate).toDateString()}
    </p>
    <p>
      <span className="font-medium text-gray-900">ISBN:</span> {book.barcode}
    </p>
    <p>
      <span className="font-medium text-gray-900">Page Count:</span>{" "}
      {book.pages}
    </p>
  </div>
</div>
    )
}