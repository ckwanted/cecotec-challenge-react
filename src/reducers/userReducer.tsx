import * as actionTypes from '../actions/types';
import Action from '../actions/Action';
import User from "../models/User";

export interface AuthReducerState {
    readonly users: User[];
    readonly isLoading: boolean;
}

const INITIAL_STATE: AuthReducerState = {
    users: [],
    isLoading: false,
}

const reducer = (state: any = INITIAL_STATE, action: Action<any>) => {
    switch(action.type) {

        case actionTypes.USER_FETCH:
            let usersPayload: User[] = action.payload;

            return {
                ...state,
                users: usersPayload,
                isLoading: false,
            }

        case actionTypes.USER_UPDATE:

            let userUpdated: User = action.payload;
            let newUsers: User[] = state.users.map((user: User) => {
                if(user.id !== userUpdated.id) return user;
                return {
                    ...user,
                    ...userUpdated,
                }
            });

            return {
                ...state,
                users: newUsers,
                isLoading: false,
            }

        case actionTypes.USER_DELETE:

            let userDelete: User = action.payload;

            return {
                ...state,
                users: state.users.filter((user: User) => user.id !== userDelete.id),
                isLoading: false,
            }

        case actionTypes.USER_CHANGE_VALUE:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            }

        default:
            return state;
     
    }
}

export default reducer;