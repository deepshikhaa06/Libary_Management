

interface BookSubjectsProps {
    subjects: string[]   
}

export const BookSubjects:React.FC<BookSubjectsProps>=({subjects})=>{
    return (
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
  <h3 className="text-lg font-semibold text-gray-800 mb-3">Book Subjects:</h3>
  <div className="flex flex-wrap gap-2">
    {subjects.map((subject, index) => (
      <p
        key={subject}
        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
      >
        {index !== subjects.length - 1 ? `${subject},` : subject}
      </p>
    ))}
  </div>
</div>

    )
}