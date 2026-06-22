import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Login from "./components/pages/Login/Login"
import Register from "./components/pages/Register/Register"
import AllMovies from "./components/pages/All Movies/AllMovies"
import { Routes, Route } from "react-router-dom"
import "./components/Footer/Footer.css"
import "./components/Navbar/Navbar.css"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="register/" element={<Register/>}/>
        <Route path="all-movies/" element={<AllMovies/>}/>
      </Routes>
      <Footer/>
    </>
  )
}
export default App
