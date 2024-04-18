import "./Header.css";
function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid header">
                    <a href="/home" className="logo">Melodify logo</a>
                    <div className="navbar-toggle"></div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/home"><div>Home</div></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/discobery"><div>Discovery</div></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header