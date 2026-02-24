import { useDispatch } from "react-redux";
import { Modal } from "../../../compontent";
import { setDisplayLibaryCard } from "../../../redux/slices/ModalSlice";
import type { AppDispatch } from "../../../redux/ReduxStore";
import { RegisterLibraryCardForm } from "./RegisterLibraryCardForm";


export const LibraryCardModal:React.FC = () => {
    const dispatch:AppDispatch=useDispatch();
    const closeModal=()=>{
        dispatch(setDisplayLibaryCard(false))
    }
    return(<Modal toggleModal={closeModal} content={<RegisterLibraryCardForm/>}/>)
}