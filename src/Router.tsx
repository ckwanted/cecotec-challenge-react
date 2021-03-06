import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

// MARK: - Graphql
import { ApolloProvider } from '@apollo/client';
import GraphqlClient from "./GraphqlClient";

// MARK: - Redux
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import history from "./history";

import { DashboardWrapper } from "./components";

// MARK: - Pages
import {
    PageWrapper,
    Login,
    NotFound,
    User,
    Product,
} from "./pages";

// MARK: - Guards
import { AuthenticatedRoute, PrivateRoute } from "./guards";

// MARK: - Routes
const Router = (): JSX.Element => {
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApolloProvider client={GraphqlClient}>

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
                                    <DashboardWrapper>
                                        <User />
                                    </DashboardWrapper>
                                </PageWrapper>
                            </PrivateRoute>

                            <PrivateRoute exact path="/dashboard/products">
                                <PageWrapper>
                                    <DashboardWrapper>
                                        <Product />
                                    </DashboardWrapper>
                                </PageWrapper>
                            </PrivateRoute>
                        
                            <Route path="*">
                                <PageWrapper>
                                    <NotFound />
                                </PageWrapper>
                            </Route>

                        </Switch>
                    </ConnectedRouter>

                </ApolloProvider>
            </PersistGate>
        </Provider>
    );
}

export default Router;