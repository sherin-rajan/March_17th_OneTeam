import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDo from "./components/ToDo";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./App.css";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Navbar />
                <main className="page-shell">
                    <Routes>
                        <Route path="/" element={<ToDo />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;