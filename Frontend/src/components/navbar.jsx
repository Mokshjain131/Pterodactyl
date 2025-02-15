// import React from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css';

function Navbar() {

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src="../assets/react.svg" alt="Logo" />
                </Link>
                <ul className="navbar-menu">
                    <li>
                        <Link to="/" className="navbar-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/chat" className="navbar-link">
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="navbar-link">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;




