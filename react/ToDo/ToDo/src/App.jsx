import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./components/about";
import Contact from "./components/contact";
import Home from "./components/home";
import Navbar from "./components/navbar";
import ToDo from "./components/ToDo";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="Todo" element={<ToDo/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;