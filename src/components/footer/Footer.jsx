import './Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {

    return (
        <>
            <script src="https://kit.fontawesome.com/yourcode.js" crossOrigin="anonymous"></script>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section about">
                            <h2 className="logo">Melodify logo</h2>
                            <div className="contact">
                                <span>Contactanos en:<br /></span>
                                <span><i className="fas fa-phone"></i> 123-456-789</span>
                                <br />
                                <span><i className="fas fa-envelope"></i> melodify@correo.com</span>
                            </div>
                            <div className="socials">
                                <a href="#"><i className="bi bi-facebook"></i></a>
                                <a href="#"><i className="bi bi-twitter-x"></i></a>
                                <a href="#"><i className="bi bi-instagram"></i></a>
                                <a href="/rss/rssBasic.xml" target='blank'><i className="bi bi-rss"></i></a>
                                <a href="https://github.com/erizomovil"><i className="bi bi-github"></i></a>
                            </div>
                        </div>
                        <div className="footer-section footer-section-links links">
                            <h2>Enlaces Rápidos</h2>
                            <ul>
                                <li><a href="#" target='blank'>Inicio</a></li>
                                <li><a href="#" target='blank1'>Servicios</a></li>
                                <li><a href="#" target='blank2'>Acerca de</a></li>
                                <li><a href="#" target='blank3'>Contacto</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h2>Información sobre nosotros</h2>
                            <p>Somos una pequeña compañia que disfruta de la musica.</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        &copy; Melodify | Escucha lo mejor de ahora
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer