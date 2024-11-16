import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { setLogin } from '@store/slices/AuthSlice';
import Navbar from '@shared-components/navbar/Navbar';
import Footer from '@shared-components/footer/Footer';
import AppRoutes from './routes/AppRoutes';

const App = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            dispatch(setLogin({ user: JSON.parse(user), token }));
        }
    }, [dispatch]);

    const shouldShowNavbar = !['/auth/login', '/auth/register'].includes(location.pathname);

    return (
        <Router>
            {shouldShowNavbar && <Navbar />}
            <AppRoutes isAuthenticated={isAuthenticated} />
            {shouldShowNavbar && <Footer />}
        </Router>
    );
};

export default App;
