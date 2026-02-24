import { Outlet } from "react-router-dom";
import type { RootState } from "../redux/ReduxStore";
import { useSelector } from "react-redux";
import { Footer, Navbar } from "../features/navigation";
import { LibraryCardModal ,LoginRegisterModal} from "../features/authentication";
import { LoanBookModal } from "../features/book";


export default function LayoutPage(){

    const state = useSelector((state: RootState) => state.modal)
    // console.log("Modal state:", state)

    return(
    <>
    {state.displayLogin && <LoginRegisterModal/>}
    {state.displayLibaryCard && <LibraryCardModal/>}
    {state.displayLoan && <LoanBookModal/>}
    <Navbar/>
    <Outlet/>   
    <Footer/>
    </>
    )
    
}