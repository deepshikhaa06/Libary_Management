import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import type { AppDispatch, RootState } from "../redux/ReduxStore"
import { fetchUser } from "../redux/slices/AuthenticationSlice"
import { UpdateUserForm } from "../features/profile/UpdateUserForm"
import { ProfileLoanHistory } from "../features/profile"


export default function ProfilePage(){

    const loggedInUser = useSelector((state: RootState) => state.authentication.loggedInUser)
    const profileUser = useSelector((state: RootState) => state.authentication.profileUser)

    const dispatch:AppDispatch = useDispatch()
    const {userId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        // console.log("userId:", userId)
  // console.log("loggedInUser:", loggedInUser)
        if(userId && loggedInUser){
            if(loggedInUser?._id === userId || loggedInUser?.type === "EMPLOYEE"){
                dispatch(fetchUser({userId, property:"profileUser"}))
            }else{
                navigate("/")
            }
        }
    },[userId, loggedInUser, dispatch, navigate])
    return(
        <>
        <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          {profileUser
            ? `${profileUser.firstname} ${profileUser.lastname}'s Profile`
            : "Loading Profile..."}
        </h1>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div className="p-6 bg-gray-100 rounded-xl shadow-inner">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b border-gray-300 pb-2">
              Account Details
            </h2>
            <UpdateUserForm />
          </div>

          {/* RIGHT COLUMN */}
          <div className="p-6 bg-gray-100 rounded-xl shadow-inner">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b border-gray-300 pb-2">
              Recent Activity
            </h2>
            {profileUser&&<ProfileLoanHistory />}
          </div>
        </div>
      </div>
    </div>

        </>
    )
}