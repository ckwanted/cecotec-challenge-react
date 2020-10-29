import { AxiosResponse } from "axios";
import ActionType from "./Action";
import * as actionTypes from './types';
import AuthService from "../services/use_case/auth/AuthService";
import LoginResponse from "../services/use_case/auth/LoginResponse";
import { replace } from "connected-react-router";
import { persistor } from "../store";

/*
 * LOGIN
 */
export const authLogin = (email: string, password: string) => {

    return async (dispatch: any) => {

        dispatch( authChangeValue('isLoading', true) );

        try {
            let response: AxiosResponse<LoginResponse> = await new AuthService().login(email, password);
            let loginResponse: LoginResponse = response.data;
            dispatch( authLoginResponse(loginResponse) );
            dispatch( replace('/dashboard') );
        }
        catch(error) {
            dispatch( authChangeValue('isLoading', false) );
        }

    };

}

export const authLoginResponse = (payload: LoginResponse): ActionType<LoginResponse> => {
    return {
        type: actionTypes.AUTH_LOGIN,
        payload,
    }
}

/*
 * LOGOUT
 */

 export const authLogout = () => {

    return async (dispatch: any) => {

        await persistor.purge();
        dispatch( authLogoutResponse() );
        dispatch( replace('/login') );

    };

}

export const authLogoutResponse = (): ActionType<null> => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}


export const authChangeValue = (key: string, value: any): ActionType<any> => {
    return {
        type: actionTypes.AUTH_CHANGE_VALUE,
        payload: {
            key, 
            value
        },
    }
}
