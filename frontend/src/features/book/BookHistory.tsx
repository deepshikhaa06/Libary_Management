import type { Book } from "../../models/Book"
import { BookHistoryItem } from "./BookHistoryItem"

interface BookHistoryProps{
    book:Book
}

export const BookHistory:React.FC<BookHistoryProps>=({book})=>{
    return(
        <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
    Loan History
  </h2>

  <div className="space-y-4">
    {book.records.map((record) => (
      <BookHistoryItem key={record._id} record={record} />
    ))}
  </div>
</div>

    )
}