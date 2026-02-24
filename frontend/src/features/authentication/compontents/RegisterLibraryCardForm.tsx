import { useDispatch, useSelector } from "react-redux";
import { getLibraryCard } from "../../../redux/slices/AuthenticationSlice";
import type { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { setDisplayLogin ,   setDisplayLibaryCard} from "../../../redux/slices/ModalSlice";


export const RegisterLibraryCardForm:React.FC = () => {
    const userState = useSelector((state: RootState) => state.authentication);
    const dispatch: AppDispatch = useDispatch();

    const handleCreateLibraryCard  = ()=>{
        if(userState.loggedInUser){
              // console.log("user id:", userState.loggedInUser._id);
            dispatch(getLibraryCard(userState.loggedInUser?._id))
        }
    }

    const handleLoginClick=()=>{
        dispatch( setDisplayLibaryCard(true))
        dispatch(setDisplayLogin(true))
    }

    return(
       <>
  {userState.loggedInUser ? (
    <div className="flex flex-col items-center justify-center text-center bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto mt-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        Welcome {userState.loggedInUser?.firstname} {userState.loggedInUser?.lastname}!
      </h3>
      <h5 className="text-gray-600 mb-4">
        To sign up for a new library card, or if you forgot your card ID number, use the button below.
      </h5>
      {userState.libraryCard ? (
        <p className="text-green-600 font-medium">
          Your Library Card ID Number is:{" "}
          {/* <span className="font-semibold text-gray-800">{userState.libraryCard}</span> */}
          <span className="font-semibold text-gray-800">
  {typeof userState.libraryCard === "object"
    ? userState.libraryCard._id
    : userState.libraryCard}
</span>

        </p>
      ) : (
        <button
          onClick={handleCreateLibraryCard}
          className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Library Card ID Number
        </button>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center text-center bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto mt-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        You must be a member of the library to obtain a library card
      </h3>
      <h4 className="text-gray-600 mb-4">
        Use the button below to log in to your account or register for free.
      </h4>
      <button
        onClick={handleLoginClick}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login Here
      </button>
    </div>
  )}
</>

    )
}