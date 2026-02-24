import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/ReduxStore";
import { loadBookByBarcode } from "../redux/slices/BookSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { BookOverview } from "../features/book/BookOverview";


export default function ResourcePage() {
    const dispatch:AppDispatch=useDispatch()
    const bookState=useSelector((state:RootState)=> state.book)
    const {barcode}  = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(barcode){
            dispatch(loadBookByBarcode(barcode))
        }
        if(bookState.error) navigate("/catalog")
    },[barcode,bookState.error])

    return (
        <div>
            <BookOverview/>
        </div>
    )
}