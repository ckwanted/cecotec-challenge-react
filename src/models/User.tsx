import { store } from '../store';

export default interface User {
    id: number;
    name: string;
    email: string;
};

export function isAuthenticated(): boolean {
    
    const { authReducer: { token } } = store.getState();

    return token !== null;

}
