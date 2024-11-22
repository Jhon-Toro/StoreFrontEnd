import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Importa useLocation
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setLogout } from '../../../store/slices/AuthSlice';
import { UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import Sidebar from '../sidebar/Sidebar';
import './Navbar.scss';

const Navbar: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation(); // Hook para obtener la ruta actual
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/auth/login');
        setIsDropdownOpen(false);
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo" onClick={closeSidebar}>
                Store
            </Link>

            <div className="navbar-links">
                <Link to="/" className={`navbar-links-item ${location.pathname === '/' ? 'active' : ''}`} onClick={closeSidebar}>
                    Inicio
                </Link>
                <Link to="/ours" className={`navbar-links-item ${location.pathname === '/ours' ? 'active' : ''}`} onClick={closeSidebar}>
                    Nosotros
                </Link>
                <Link to="/categories" className={`navbar-links-item ${location.pathname === '/categories' ? 'active' : ''}`} onClick={closeSidebar}>
                    Categorías
                </Link>
                <Link to="/cart" className={`navbar-links-item ${location.pathname === '/cart' ? 'active' : ''}`} onClick={closeSidebar}>
                    Carrito
                </Link>
                <Link to="/contact" className={`navbar-links-item ${location.pathname === '/contact' ? 'active' : ''}`} onClick={closeSidebar}>
                    Contacto
                </Link>
                {user?.isAdmin && (
                    <Link to="/admin/dashboard" className={`navbar-links-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`} onClick={closeSidebar}>
                        Admin
                    </Link>
                )}
            </div>

            <div className="navbar-account">
                <UserIcon onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="navbar-user-icon" />
                <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                    {isAuthenticated ? (
                        <>
                            <span className="dropdown-item user-name">Hola {isAuthenticated && user?.username}</span>
                            <Link to="/orders" onClick={() => setIsDropdownOpen(false)} className="dropdown-item">
                                Mis Órdenes
                            </Link>
                            <button onClick={handleLogout} className="dropdown-item-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/login" onClick={() => setIsDropdownOpen(false)} className="dropdown-item">
                                Iniciar Sesión
                            </Link>
                            <Link to="/auth/register" onClick={() => setIsDropdownOpen(false)} className="dropdown-item">
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="navbar-toggle" onClick={toggleSidebar}>
                {isSidebarOpen ? <XMarkIcon className="icon" /> : <Bars3Icon className="icon" />}
            </div>

            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </nav>
    );
};

export default Navbar;
