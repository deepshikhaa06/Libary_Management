import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import type { RootState } from "../../redux/ReduxStore"
import { calculatePaging } from "./utils/CatalogUtils"


export const CatalogSearchPageNavigator = () => {
    const pagingInformation=useSelector((state:RootState)=> state.book.pagingInformation)
    const navigate = useNavigate()
    const {search} = useLocation()

    const navigatePrevious = ()=>{
        if(pagingInformation && pagingInformation.currentPage !==1){
            if(search.includes("&page=")){
                let splitString = search.split("&page=")
                let newTerms = splitString[0] + `&page=${pagingInformation.currentPage-1}` 
                navigate(`/catalog${newTerms}`)
            }
        }
    }
    const navigateToNumber =(e:React.MouseEvent<HTMLButtonElement>)=>{
        if(search.includes("&page=")){
            let splitString = search.split("&page=")
            let newTerms = splitString[0] + `&page=${e.currentTarget.id}` 
            navigate(`/catalog${newTerms}`)
        }else{
            let newTerms = search + `&page=${e.currentTarget.id}` 
            navigate(`/catalog${newTerms}`)
        }
    }
    const navigateNext = ()=>{
     if(pagingInformation && pagingInformation.currentPage !== pagingInformation.totalPages){
        if(search.includes("&page=")){
            let splitString = search.split("&page=")
            let newTerms = splitString[0] + `&page=${pagingInformation.currentPage+1}` 
            navigate(`/catalog${newTerms}`)
        }else{
            let newTerms = search + `&page=${pagingInformation.currentPage+1}` 
            navigate(`/catalog${newTerms}`)
        }
     }   
    }
    return (
        <div className="flex justify-center items-center gap-4 mt-6">
        <p
        onClick={navigatePrevious}
        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" >Prev</p>
        <div className="flex gap-2">
  {pagingInformation &&
    calculatePaging(pagingInformation).map((num) => {
      const isCurrent = num === `${pagingInformation.currentPage}`
      return (
        <p
          key={num}
          id={num}
          onClick={!isCurrent ? navigateNext : undefined}
          className={`
            cursor-pointer px-3 py-1 rounded-md border transition
            ${isCurrent 
              ? "bg-blue-600 text-white border-blue-600" 
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
            }
          `}
        >
          {num}
        </p>
      )
    })}
</div>

       <p
       onClick={navigateNext}
        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Next</p>
        </div>
        )
}