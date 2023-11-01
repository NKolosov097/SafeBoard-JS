import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { paths } from "./paths"
import { Header } from "./components/Header/Header"
import { Home } from "./pages/Home/Home"
import { Users } from "./pages/Users/Users"
import { useAppDispatch } from "./hooks"
import { fetchGetCards } from "./redux/slices/cards"

function App(): React.JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGetCards())
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.users} element={<Users />} />
      </Routes>
    </>
  )
}

export default App
