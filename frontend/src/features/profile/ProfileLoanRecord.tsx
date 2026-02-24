import type { LoanRecord } from "../../models/LoanRecord"

interface ProfileLoanRecordProps{
    record:LoanRecord
}

export const ProfileLoanRecord:React.FC<ProfileLoanRecordProps>=({record})=>{
    return(
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
  <h4 className="text-lg font-semibold text-gray-800 mb-2">
    Title: <span className="text-blue-600">{record.item.title}</span>
  </h4>
  <h4
    className={`text-base font-medium mb-2 ${
      record.status === "AVAILABLE" ? "text-green-600" : "text-red-600"
    }`}
  >
    Status: {record.status === "AVAILABLE" ? "Returned" : "Loaned"}
  </h4>
  <p className="text-gray-700">
    <span className="font-semibold">Loan Date:</span> {new Date(record.loanedDate).toDateString()}
  </p>
  <p className="text-gray-700">
    <span className="font-semibold">Return by Date:</span> {new Date(record.dueDate).toDateString()}
  </p>
  {record.returnedDate && (
    <p className="text-gray-700">
      <span className="font-semibold">Date Returned:</span>{" "}
      {new Date(record.returnedDate).toDateString()}
    </p>
  )}
</div>

    )
}