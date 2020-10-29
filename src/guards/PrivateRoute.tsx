import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";
import { isAuthenticated } from '../models/User';

const PrivateRoute = (props: any): JSX.Element => {

    const {children, ...rest} = props;

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );

}

export default PrivateRoute;