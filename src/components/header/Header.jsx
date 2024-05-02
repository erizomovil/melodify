import React, { useState } from 'react';
import "./Header.css";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid header">
                    <a href="/home" className="logo">Melodify logo</a>
                    <i className="bi bi-three-dots-vertical navbar-menu-icon" onClick={toggleMenu}></i>
                    {isOpen && (
                        <nav className="navbar-menu">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/home"><div>Home</div></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/Discovery"><div>Discovery</div></a>
                                </li>
                            </ul>
                        </nav>
                    )}
                    <div className="navbar-toggle"></div>
                    <div className='navbar-hide'>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/home"><div>Home</div></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Discovery"><div>Discovery</div></a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header