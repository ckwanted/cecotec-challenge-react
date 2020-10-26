import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";
import { store } from '../store';

export default (props: any): JSX.Element => {

    const {children, ...rest} = props;
    const { authReducer: { token } } = store.getState();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                            state: { from: location }
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );

}

