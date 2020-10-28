import { store } from '../store';

export default interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
};

export function isAuthenticated(): boolean {
    
    const { authReducer: { token } } = store.getState();

    return token !== null;

}

export function getAvatarUrl(user: User | null): string {
    return user?.avatar ?? "/img/avatar.svg";
}
