import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section footer-about">
                    <h3 className="footer-logo">Store</h3>
                </div>

                <div className="footer-section footer-nav">
                    <h4>Enlaces útiles</h4>
                    <ul>
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/products">Productos</Link>
                        </li>
                        <li>
                            <Link to="/categories">Categorías</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contacto</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer-section footer-contact">
                    <h4>Contacto</h4>
                    <p>+57 3044361707</p>
                    <p>contacto@mitienda.com</p>
                    <p>Carrera 42 #48-20</p>
                </div>

                <div className="footer-section footer-social">
                    <h4>Redes Sociales</h4>
                    <div className="footer-social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()}. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
