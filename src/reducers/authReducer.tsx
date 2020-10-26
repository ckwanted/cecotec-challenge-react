import * as actionTypes from '../actions/types';
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

        default:
            return state;
     
    }
}
