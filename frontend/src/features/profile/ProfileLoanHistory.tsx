import { useEffect, useState } from "react"
import type { LoanRecord } from "../../models/LoanRecord"
import axios from "axios"
import type { RootState } from "../../redux/ReduxStore"
import { ProfileLoanRecord } from "./ProfileLoanRecord"
import { useSelector } from "react-redux"


export const ProfileLoanHistory:React.FC=()=>{
    const user = useSelector((state:RootState) => state.authentication.profileUser)   
    const [records , setRecords]=useState<LoanRecord[]>([])

    const fetchRecordsForUser = async () => {
        if(user){
            try {
                let res= await axios.post("http://localhost:8080/loan/query",{property: "patron", value: user._id })
                let r =  res.data.records
                setRecords(r)
            } catch (error) {
                
            }
        }
    }

    useEffect(() => {
        fetchRecordsForUser()
    }, [user])

    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
  <h3 className="text-2xl font-semibold text-gray-800 mb-5">
    {user?.firstname}'s Item Loan History
  </h3>
  <div className="space-y-4">
    {records.map((record) => (
      <ProfileLoanRecord key={record._id} record={record} />
    ))}
  </div>
</div>

    )
}