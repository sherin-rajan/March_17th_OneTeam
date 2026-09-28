import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <Link className="brand" to="/">Daymark</Link>
            <div className="nav-links">
                <Link to="/">ToDo</Link>
                <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
                    <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
                    {theme === "light" ? "Dark mode" : "Light mode"}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
