import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/ReduxStore"
import { setDisplayLoan } from "../../redux/slices/ModalSlice"
import { Modal } from "../../compontent"
import { determineLoanModalContent } from "./utils/BookUtils"


export const LoanBookModal:React.FC=()=>{
    const currentBook=useSelector((state:RootState)=>state.book.currentBook)
    const dispatch:AppDispatch=useDispatch()
    const closeModal=()=>{dispatch(setDisplayLoan(false))}
    return(<Modal toggleModal={closeModal} content={currentBook ? determineLoanModalContent(currentBook):<></>}/>);
}