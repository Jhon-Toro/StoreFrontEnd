import { AuthState, User } from '@interfaces/store/AuthSlice.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const getUserFromLocalStorage = (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const initialState: AuthState = {
    isAuthenticated: Boolean(localStorage.getItem('token')),
    user: getUserFromLocalStorage(),
    token: localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        setLogout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
