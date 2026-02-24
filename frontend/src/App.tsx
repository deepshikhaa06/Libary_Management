import { useEffect, useState } from "react"
import HomePage from "./pages/HomePage"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./redux/ReduxStore"
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import LayoutPage from "./pages/LayoutPage"
import { fetchUser } from "./redux/slices/AuthenticationSlice"
import ProfilePage from "./pages/ProfilePage"
import CatalogPage from "./pages/CatalogPage"
import ResourcePage from "./pages/ResourcePage"

function App() {
  const loggedInUser = useSelector((state: RootState)=> state.authentication.loggedInUser)
  const dispatch:AppDispatch = useDispatch()

  useEffect(() => {
    console.log(loggedInUser)
    let userId = localStorage.getItem("userId")
    if(userId && !loggedInUser){
      dispatch(fetchUser({userId, property:"loggedInUser"}))
    }
  },[loggedInUser])
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LayoutPage/>}>
      <Route index element={<HomePage/>}></Route>
      <Route path="/catalog" element={<CatalogPage/>}></Route>
      <Route path="/resource/:barcode" element={<ResourcePage/>}></Route>
      <Route path="/profile/:userId" element={<ProfilePage/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
