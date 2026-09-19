import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <link to="todo">ToDo</link>
        </nav>
    );
}

export default Navbar;
