import { useRef } from "react"
import { useNavigate } from "react-router-dom";


export const CatalogAdvanceSearch:React.FC = () => {
    const navigate=useNavigate()

    const isbnRef  = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef= useRef<HTMLInputElement>(null);
    const descriptionRef= useRef<HTMLInputElement>(null);
    const subjectRef= useRef<HTMLInputElement>(null);
    const genreRef = useRef<HTMLInputElement>(null);

    // const search = () => {
    //     let query="";
        
    //     if(isbnRef && isbnRef.current && isbnRef.current.value !== "") query +=`?barcode=${isbnRef.current.value}`
    //     if(titleRef && titleRef.current && titleRef.current.value !== "") {
    //         query +=query===""?`?title=${titleRef.current.value}`:`&title=${titleRef.current.value}`
    //     }
    //     if(authorRef  && authorRef.current && authorRef.current.value !== "") {
    //         query +=query===""?`?author=${authorRef.current.value}`:`&author=${authorRef.current.value}`
    //     }
    //     if(descriptionRef && descriptionRef.current && descriptionRef.current.value !== "") {
    //         query +=query===""?`?description=${descriptionRef.current.value}`:`&description=${descriptionRef.current.value}`
    //     }
    //     if(subjectRef && subjectRef.current && subjectRef.current.value !== "") {
    //         query +=query===""?`?subject=${subjectRef.current.value}`:`&subject=${subjectRef.current.value}`
    //     }
    //     if(genreRef && genreRef.current && genreRef.current.value !== "") {
    //         query +=query===""?`?genre=${genreRef.current.value}`:`&genre=${genreRef.current.value}`
    //     }
    //     navigate(`/catalog${query}`)
    // }
    const search = () => {
  const params = new URLSearchParams();

  if (isbnRef.current?.value) params.append("barcode", isbnRef.current.value);
  if (titleRef.current?.value) params.append("title", titleRef.current.value);
  if (authorRef.current?.value) params.append("author", authorRef.current.value);
  if (descriptionRef.current?.value) params.append("description", descriptionRef.current.value);
  if (subjectRef.current?.value) params.append("subject", subjectRef.current.value);
  if (genreRef.current?.value) params.append("genre", genreRef.current.value);

  const query = params.toString(); // e.g. "genre=fiction&author=rowling"
  navigate(`/catalog${query ? `?${query}` : ""}`);
};



    return (
       <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
  <h2 className="text-2xl font-bold text-indigo-700 text-center mb-2">
    Advanced Book Search
  </h2>
  <p className="text-gray-600 text-center mb-6">
    Fill in as many fields as you want to narrow down your search
  </p>

  <form className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
      <input
        type="text"
        ref={isbnRef}
        placeholder="ISBN"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input
        type="text"
        ref={titleRef}
        placeholder="Title"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
      <input
        type="text"
        ref={authorRef}
        placeholder="Author"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <input
        type="text"
        ref={descriptionRef}
        placeholder="Description"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
      <input
        type="text"
        ref={subjectRef}
        placeholder="Subject"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
      <input
        type="text"
        ref={genreRef}
        placeholder="Genre"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div className="md:col-span-3 lg:col-span-1 flex justify-center md:justify-end">
      <button
        onClick={(e)=>{e.preventDefault();search()}}
        className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200"
      >
        Search
      </button>
    </div>
  </form>
</div>


    )
}