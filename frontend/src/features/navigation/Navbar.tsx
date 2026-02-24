import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/ReduxStore";
import { Link, useNavigate } from "react-router-dom";
import { setDisplayLogin } from "../../redux/slices/ModalSlice";
import { Book, Search } from "@mui/icons-material";



export const Navbar:React.FC = () => {

    const searchRef = useRef<HTMLInputElement>(null);
    const authState= useSelector((state:RootState)=>state.authentication)
    const navigate= useNavigate()
    const dispatch:AppDispatch = useDispatch()

    const handleEnterKey = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        // if(e.key==="Enter"&& searchRef && searchRef.current && searchRef.current.value.length > 0){
        //     navigate(`/catalog?barcode=${searchRef.current.value}`)
        //     searchRef.current.value="";
        // }
        if (e.key === "Enter") {
    e.preventDefault();
    handleSearch();
  }
    }

    const handleSearchIconClicked = () => {
    //  if(searchRef && searchRef.current && searchRef.current.value.length > 0){
    //     navigate(`/catalog?barcode=${searchRef.current.value}`)
    //     searchRef.current.value="";
    //  }
    handleSearch();
    }

    const navigateToProfile = () => {
        if(authState.loggedInUser){
            navigate(`/profile/${authState.loggedInUser._id}`)
        }
    }

    const toggleLogin = () => {
        dispatch(setDisplayLogin(true))
    }

    const handleSearch = () => {
  if (searchRef.current && searchRef.current.value.trim().length > 0) {
    const value = encodeURIComponent(searchRef.current.value.trim());
    navigate(`/catalog?title=${value}&author=${value}&description=${value}`);
    searchRef.current.value = "";
  }
};

    return (
        <nav className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white shadow-lg">
  <Link to="/" className="flex items-center gap-2 hover:text-gray-200 transition">
    <Book sx={{ fontSize: "2rem" }} />
    <h2 className="text-2xl font-semibold">My Library</h2>
  </Link>

  <div className="flex items-center gap-4">
    <Link
      to="/catalog"
      className="text-lg font-medium hover:text-gray-200 transition"
    >
      View Catalog
    </Link>

    <div className="flex items-center bg-white rounded-full overflow-hidden">
      <input
        placeholder="Search Catalog"
        onKeyDown={handleEnterKey}
        ref={searchRef}
        className="px-4 py-2 w-48 text-gray-800 focus:outline-none"
      />
      <button
        onClick={handleSearchIconClicked}
        className="bg-blue-500 px-3 py-2 hover:bg-blue-700 transition"
      >
        <Search sx={{ fontSize: "1.8rem" }} className="text-white" />
      </button>
    </div>

    {authState.loggedInUser ? (
      <div
        onClick={navigateToProfile}
        className="cursor-pointer hover:text-gray-200 transition"
      >
        <h2 className="text-lg font-medium">
          {authState.loggedInUser.firstname}'s Account
        </h2>
      </div>
    ) : (
      <div
        onClick={toggleLogin}
        className="cursor-pointer hover:text-gray-200 transition"
      >
        <h2 className="text-lg font-medium">Login</h2>
      </div>
    )}
  </div>
</nav>

    )
}