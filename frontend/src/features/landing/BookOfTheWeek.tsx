import { BookInformation } from "../book";

export const BookOfTheWeek = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 py-6 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-wall.png')] opacity-30 pointer-events-none"></div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 text-center drop-shadow-md z-10 ">
        📚 Book of the Week
      </h1>

      {/* Book Information Card */}
      <div className="z-10">
        <BookInformation
          book={{
            _id: "123",
            barcode: "979-8351145013",
            cover:
              "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
            title: "The Great Gatsby",
            authors: ["F. Scott Fitzgerald"],
            description:
              "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted 'gin was the national drink and sex the national obsession,' it is an exquisitely crafted tale of America in the 1920s. The Great Gatsby is one of the great classics of twentieth-century literature.",
            subjects: [
              "Married people, fiction",
              "American fiction (fictional works by one author)",
              "Fiction, psychological",
            ],
            publisher: "Scribner",
            publicationDate: "1925-09-10",
            pages: 208,
            genre: "Fiction",
            records: [],
          }}
        />
      </div>
    </section>
  );
};
