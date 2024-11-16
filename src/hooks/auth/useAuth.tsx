import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

export const useAuth = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    return Boolean(token);
};
