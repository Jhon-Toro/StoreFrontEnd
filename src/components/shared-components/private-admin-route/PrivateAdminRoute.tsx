import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

export const PrivateAdminRoute = ({ children }: { children: JSX.Element }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user?.isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};
