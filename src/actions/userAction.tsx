import { AxiosResponse } from "axios";
import ActionType from "./Action";
import * as actionTypes from './types';
import UserService from "../services/use_case/user/UserService";
import User from "../models/User";

/*
 * User
 */
export const fetchUsers = (search: string = "") => {

    return async (dispatch: any) => {

        dispatch( userChangeValue('isLoading', true) );

        try {
            let response: AxiosResponse<User[]> = await new UserService().fetch(search);
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

export const createUser = (user: User) => {

    return async (dispatch: any) => {

        dispatch( userChangeValue('isLoading', true) );

        try {
            await new UserService().create(user);
            dispatch( createUserResponse(user) );
        }
        catch(error) {
            dispatch( userChangeValue('isLoading', false) );
        }

    };

}

const createUserResponse = (payload: User): ActionType<User> => {
    return {
        type: actionTypes.USER_CREATE,
        payload,
    }
}

export const updateUser = (user: User) => {

    return async (dispatch: any) => {

        dispatch( userChangeValue('isLoading', true) );

        try {
            await new UserService().update(user);
            dispatch( updateUserResponse(user) );
        }
        catch(error) {
            dispatch( userChangeValue('isLoading', false) );
        }

    };

}

const updateUserResponse = (payload: User): ActionType<User> => {
    return {
        type: actionTypes.USER_UPDATE,
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
