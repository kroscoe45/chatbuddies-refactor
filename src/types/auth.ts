export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    employee: {
        id: number;
        organization: {
            id: number;
            name: string;
        };
        phone?: string;
        status: 'active' | 'inactive';
        privileges: string[];
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface ResetPasswordRequest {
    email: string;
}

export interface NewPasswordData {
    password1: string;
    password2: string;
    email: string;
    token: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}