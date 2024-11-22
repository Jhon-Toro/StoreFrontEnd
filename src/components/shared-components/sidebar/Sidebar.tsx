import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { setLogout } from '@store/slices/AuthSlice';
import { SidebarProps } from '@interfaces/sidebar/sidebar.interface';
import './Sidebar.scss';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
        onClose();
    };

    useEffect(() => {
        handleClickOff();
    }, [isOpen, onClose]);

    const handleClickOff = () => {
        const handleOutsideClick = (e: MouseEvent) => {
            if ((e.target as HTMLElement).classList.contains('overlay')) onClose();
        };
        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }
        return () => document.removeEventListener('click', handleOutsideClick);
    };
    return (
        <>
            <div className={`overlay ${isOpen ? 'show' : ''}`} />
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={onClose}>
                    ×
                </button>
                <ul className="sidebar-links">
                    <li>
                        <Link to="/" onClick={onClose}>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/ours" onClick={onClose}>
                            Nosotros
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" onClick={onClose}>
                            Productos
                        </Link>
                    </li>
                    <li>
                        <Link to="/categories" onClick={onClose}>
                            Categorías
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" onClick={onClose}>
                            Carrito
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={onClose}>
                            Contacto
                        </Link>
                    </li>
                    <li className="sidebar-user">
                        {isAuthenticated ? (
                            <>
                                <span>Hola, {user?.username}</span>
                                <Link to="/orders" onClick={onClose}>
                                    Mis Órdenes
                                </Link>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/login" onClick={onClose}>
                                    Iniciar Sesión
                                </Link>
                                <Link to="/auth/register" onClick={onClose}>
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
