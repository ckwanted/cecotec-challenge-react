import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";
import { isAuthenticated } from '../models/User';

const AuthenticatedRoute = (props: any): JSX.Element => {

    const {children, ...rest} = props;

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() ? (
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

export default AuthenticatedRoute;

