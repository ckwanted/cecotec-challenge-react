import ActionType from "./Action";
import * as actionTypes from './types';

export const dashboardToggleNav = (): ActionType<null> => {
    document.querySelector(".dashboard__nav")?.classList.toggle("dashboard__nav--open");
    return {
        type: actionTypes.DASHBOARD_TOGGLE_NAV,
    }
}
