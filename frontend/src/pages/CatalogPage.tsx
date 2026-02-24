import { useLocation } from "react-router-dom";
import { CatalogOverview, CatalogSearch } from "../features/catalog";


export default function CatalogPage() {
    const  location = useLocation()
    return (
        <div>
            {location.search==="" ? <CatalogOverview/>: <CatalogSearch/>}
        </div>
    )
}