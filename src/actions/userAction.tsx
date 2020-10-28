import { AxiosResponse } from "axios";
import ActionType from "./Action";
import * as actionTypes from './types';
import UserService from "../services/use_case/user/UserService";
import User from "../models/User";

/*
 * User
 */
export const fetchUsers = () => {

    return async (dispatch: any) => {

        dispatch( userChangeValue('isLoading', true) );

        try {
            let response: AxiosResponse<User[]> = await new UserService().fetch();
            let loginResponse: User[] = response.data;
            dispatch( fetchUserResponse(loginResponse) );
        }
        catch(error) {
            dispatch( userChangeValue('isLoading', false) );
        }

    };

}

export const fetchUserResponse = (payload: User[]): ActionType<User[]> => {
    return {
        type: actionTypes.USER_FETCH,
        payload,
    }
}

export const deleteUser = (user: User) => {

    return async (dispatch: any) => {

        dispatch( userChangeValue('isLoading', true) );

        try {
            await new UserService().delete(user);
            dispatch( deleteUserResponse(user) );
        }
        catch(error) {
            dispatch( userChangeValue('isLoading', false) );
        }

    };

}

const deleteUserResponse = (payload: User): ActionType<User> => {
    return {
        type: actionTypes.USER_DELETE,
        payload,
    }
}

export const userChangeValue = (key: string, value: any): ActionType<any> => {
    return {
        type: actionTypes.USER_CHANGE_VALUE,
        payload: {
            key, 
            value
        },
    }
}
