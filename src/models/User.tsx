import { store } from '../store';

export default interface User {
    id?: number | null;
    name: string;
    email: string;
    password?: string | null; // Should not be added to the model but is an api mock
    avatar: string | null;
};

export function isAuthenticated(): boolean {
    
    const { authReducer: { token } } = store.getState();

    return token !== null;

}

export function getAvatarUrl(user: User | null): string {
    return user?.avatar ?? "/img/avatar.svg";
}
