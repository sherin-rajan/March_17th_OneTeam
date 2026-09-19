import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="home">Home</Link>
            <Link to="/">ToDo</Link>
        </nav>
    );
}

export default Navbar;
