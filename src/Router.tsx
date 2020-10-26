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
import { AuthenticatedRoute } from "./guards";

// MARK: - Routes
export default () => {
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