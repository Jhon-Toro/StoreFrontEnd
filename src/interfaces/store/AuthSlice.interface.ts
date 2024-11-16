export interface User {
    username: string;
    isAdmin: boolean;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}
