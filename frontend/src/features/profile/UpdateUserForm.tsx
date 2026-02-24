import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/ReduxStore";
import type { User } from "../../models/User";
import { useNavigate } from "react-router-dom";
import { Create } from "@mui/icons-material";
import { fetchUser, resetUser, updateUser } from "../../redux/slices/AuthenticationSlice";


export  const UpdateUserForm:React.FC = ()=> {
    const userState = useSelector((state:RootState) => state.authentication);
    const dispatch:AppDispatch = useDispatch();
    const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>()
    const navigate = useNavigate()

    const updateUserState=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setDisplayUpdate(true)
        if(e.target.name && user){
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
    }
    const submitUpdatedUser = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(user) {
           await dispatch(updateUser(user))
           await dispatch(fetchUser({userId:user._id, property:"profileUser"}))
            setDisplayUpdate(false)
        }
    }
    const logout = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        localStorage.removeItem('userId')
        dispatch(resetUser('loggedInUser'))
        dispatch(resetUser('profileUser'))   
        navigate('/')
    }
    useEffect(() => {
        if(userState.profileUser){
            setUser(JSON.parse(JSON.stringify(userState.profileUser)))
        }
    },[userState.profileUser,user])
    return(
        <>
        <form className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 space-y-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Update Profile
      </h2>

      {/* First Name */}
      <div className="relative">
        <h4 className="text-gray-700 mb-1 font-medium">First Name</h4>
        <input
          type="text"
          value={user?.firstname || ""}
          name="firstname"
          onChange={updateUserState}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create className="absolute top-9 right-3 text-gray-500 cursor-pointer hover:text-blue-600" />
        )}
      </div>

      {/* Last Name */}
      <div className="relative">
        <h4 className="text-gray-700 mb-1 font-medium">Last Name</h4>
        <input
          type="text"
          value={user?.lastname || ""}
          name="lastname"
          onChange={updateUserState}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create className="absolute top-9 right-3 text-gray-500 cursor-pointer hover:text-blue-600" />
        )}
      </div>

      {/* Email */}
      <div className="relative">
        <h4 className="text-gray-700 mb-1 font-medium">Email</h4>
        <input
          value={user?.email || ""}
          type="email"
          name="email"
          onChange={updateUserState}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create className="absolute top-9 right-3 text-gray-500 cursor-pointer hover:text-blue-600" />
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-4 mt-6">
        {displayUpdate && (
          <button
            onClick={submitUpdatedUser}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Update Profile
          </button>
        )}

        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <button
            onClick={logout}
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Logout of Account
          </button>
        )}
      </div>
    </form>
        </>
    )
}