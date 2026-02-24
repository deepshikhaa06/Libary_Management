import { useRef, useState } from "react"
import type { Book } from "../../models/Book"
import { BookCard } from "./BookCard"

interface BookCardProps{
    books:Book[]
}

export const BookCarousel : React.FC<BookCardProps> = ({books}) => {
    const [order,setOrder]  = useState<Book[]>(books)

    // const moveLeft = () =>{
    //     let item = order[0]
    //     let reordered =  order.slice(1,order.length)
    //     reordered.push(item)
    //     setOrder(reordered)   
    // }
    // const moveRight = () =>{
    //  let item = order[order.length-1]
    //  let reordered =  order.slice(0,order.length-1)   
    //  reordered=[...reordered,item]
    //  setOrder(reordered)
    // }
    // Move carousel to the left
  const [startIndex, setStartIndex] = useState(0);
  const booksPerPage = 4;

  // Slice visible books
  const visibleBooks = books.slice(startIndex, startIndex + booksPerPage);

  // Move to next set of books
  const moveRight = () => {
    if (startIndex + booksPerPage < books.length) {
      setStartIndex(startIndex + booksPerPage);
    } else {
      // Loop back to start
      setStartIndex(0);
    }
  };

  // Move to previous set of books
  const moveLeft = () => {
    if (startIndex === 0) {
      // Go to last full page if we’re at the beginning
      const remainder = books.length % booksPerPage;
      const lastStart =
        remainder === 0 ? books.length - booksPerPage : books.length - remainder;
      setStartIndex(lastStart);
    } else {
      setStartIndex(startIndex - booksPerPage);
    }
  };
    return  (
        <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto mt-8">
  {/* Left Button */}
  <div
    onClick={moveLeft}
    className="absolute left-0 z-10 bg-gray-800 text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700 transition" >{"<"}
  </div>

  {/* Books Container */}
  <div className="flex gap-6 overflow-x-auto px-10 scrollbar-hide" >
    {visibleBooks.map((item) => (
      <BookCard key={item.barcode} book={item} />
    ))}
  </div>

  {/* Right Button */}
  <div
    onClick={moveRight}
    className="absolute right-0 z-10 bg-gray-800 text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700 transition" >{">"}
  </div>
</div>

    )    
}
