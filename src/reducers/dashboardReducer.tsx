import * as actionTypes from '../actions/types';
import Action from '../actions/Action';

export interface DashboardReducerState {
    readonly isOpenNav: boolean;
}

const INITIAL_STATE: DashboardReducerState = {
    isOpenNav: false,
}

const reducer = (state: any = INITIAL_STATE, action: Action<any>) => {
    switch(action.type) {

        case actionTypes.DASHBOARD_TOGGLE_NAV:
            return {
                ...state,
                isOpenNav: !state.isOpenNav,
            }

        default:
            return state;
     
    }
}

export default reducer;