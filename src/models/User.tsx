import { store } from '../store';

export default interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
};

export function isAuthenticated(): boolean {
    
    const { authReducer: { token } } = store.getState();

    return token !== null;

}
