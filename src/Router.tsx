import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

// MARK: - Redux
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import history from "./history";

// MARK: - Pages
import {
    PageWrapper,
    Login,
    NotFound,
} from "./pages";

// MARK: - Guards
import { AuthenticatedRoute, PrivateRoute } from "./guards";

// MARK: - Routes
const Router = (): JSX.Element => {
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Switch>

                        <Route exact path="/">
                            <Redirect to="/login" />
                        </Route>

                        <AuthenticatedRoute exact path="/login">
                            <PageWrapper>
                                <Login />
                            </PageWrapper>
                        </AuthenticatedRoute>

                        <PrivateRoute exact path="/dashboard">
                            <Redirect to="/dashboard/users" />
                        </PrivateRoute>

                        <PrivateRoute exact path="/dashboard/users">
                            <PageWrapper>
                                <h1>users</h1>
                            </PageWrapper>
                        </PrivateRoute>
                    
                        <Route path="*">
                            <PageWrapper>
                                <NotFound />
                            </PageWrapper>
                        </Route>

                    </Switch>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
}

export default Router;