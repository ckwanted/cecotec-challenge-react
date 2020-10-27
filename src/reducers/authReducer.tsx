import * as actionTypes from '../actions/types';
import LoginResponse from '../services/use_case/auth/LoginResponse';
import Action from '../actions/Action';
import User from "../models/User";

export interface AuthReducerState {
    readonly user: User | null;
    readonly token: string | null;
    readonly isLoading: boolean;
}

const INITIAL_STATE: AuthReducerState = {
    user: null,
    token: null,
    isLoading: false,
}

export default (state: any = INITIAL_STATE, action: Action<any>) => {
    switch(action.type) {

        case actionTypes.AUTH_LOGIN:
            let loginPayload: LoginResponse = action.payload;

            return {
                ...state,
                user: { // Hardcoding user because is mock server
                    id: 0,
                    name: "admin",
                    email: "develop@cecotec.com",
                },
                token: loginPayload.accessToken,
                isLoading: false,
            }

        case actionTypes.AUTH_CHANGE_VALUE:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...INITIAL_STATE
            }

        default:
            return state;
     
    }
}
