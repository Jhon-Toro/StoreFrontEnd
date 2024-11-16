import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/auth/useAuth';

const PrivateRoute = () => {
    const isAuthenticated = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
