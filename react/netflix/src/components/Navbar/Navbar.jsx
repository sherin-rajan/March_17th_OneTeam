import { Link } from "react-router-dom"

function Navbar(){
    return(
        <nav>
            <div>logo</div>
            <ul>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/all-movies">All Movies</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar