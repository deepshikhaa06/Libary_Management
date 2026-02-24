import { useNavigate } from "react-router-dom";
import type { LoanRecord } from "../../models/LoanRecord";

interface BookHistoryItemProps{
    record:LoanRecord
}

export const BookHistoryItem:React.FC<BookHistoryItemProps>=({record})=>{
    const navigate = useNavigate();

    const visitProfile=()=>{navigate(`/profile/${record.patron}`)}

    return(
       <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mt-6">
  <h4 className="text-lg font-semibold text-gray-800 mb-3">
    Status:{" "}
    <span
      className={
        record.status === "AVAILABLE"
          ? "text-green-600 font-bold"
          : "text-red-600 font-bold"
      }
    >
      {record.status}
    </span>
  </h4>

  <div className="mb-4 space-y-1 text-gray-700">
    <p
      className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
      onClick={visitProfile}
    >
      <span className="font-medium text-gray-900">Patron:</span>{" "}
      {record.patron}
    </p>
    <p>
      <span className="font-medium text-gray-900">Loan Date:</span>{" "}
      {new Date(record.loanedDate).toDateString()}
    </p>
    {record.status === "AVAILABLE" && record.returnedDate && (
      <p>
        <span className="font-medium text-gray-900">Return Date:</span>{" "}
        {new Date(record.returnedDate).toDateString()}
      </p>
    )}
  </div>

  <div className="space-y-1 text-gray-700">
    <p>
      <span className="font-medium text-gray-900">Loaner:</span>{" "}
      {record.employeeOut}
    </p>
    <p>
      <span className="font-medium text-gray-900">Return By Date:</span>{" "}
      {new Date(record.dueDate).toDateString()}
    </p>
    {record.status === "AVAILABLE" && record.employeeIn && (
      <p>
        <span className="font-medium text-gray-900">Returner:</span>{" "}
        {record.employeeIn}
      </p>
    )}
  </div>
</div>

    )
}