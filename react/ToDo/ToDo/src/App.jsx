import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/about";
import Contact from "./components/contact";
import Home from "./components/home";

function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/contact" element={<Contact/>} />
            </Routes>
        </BrowserRouter>
    </>
    );
}

export default App;