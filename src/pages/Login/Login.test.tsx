import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import i18n from '../../i18n';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from "redux-thunk";
import * as actionCreator from "../../actions";
import * as actionTypes from "../../actions/types";

const middlewares: any[] = [thunk];
const mockStore = configureStore(middlewares);

describe("Login Component", () => {

    const initialState = {
        authReducer: {
            user: null,
            token: null,
            isLoading: false,
        }
    }

    let store: MockStoreEnhanced<unknown, {}>;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    afterEach(cleanup);

    async function dispathAuthLogin(email: string, password: string) {
        const { getByTestId } = render(
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <Login />
                </Provider>
            </I18nextProvider>
        );

        userEvent.type(getByTestId("email"), email);
        userEvent.type(getByTestId("password"), password);
        
        await act(async () => {
            await store.dispatch<any>( actionCreator.authLogin(email, password) );
        });
    }

    test("Should have invalid credentials", async () => {
        
        await dispathAuthLogin("develop@cecotec.com", "wrong password");

        const actions = store.getActions();
        expect(actions).toEqual([
            {
                type: actionTypes.AUTH_CHANGE_VALUE,
                payload: {
                    key: "isLoading", 
                    value: true
                },
            },
            {
                type: actionTypes.AUTH_CHANGE_VALUE,
                payload: {
                    key: "isLoading", 
                    value: false
                },
            }
        ]);

    });

    test("Should have valid credentials", async () => {
        
        await dispathAuthLogin("develop@cecotec.com", "password");

        const actions = store.getActions();
        expect(actions).toEqual([
            {
                type: actionTypes.AUTH_CHANGE_VALUE,
                payload: {
                    key: "isLoading", 
                    value: true
                },
            },
            {
                type: actionTypes.AUTH_LOGIN,
                payload: expect.any(Object),
            },
            {
                type: '@@router/CALL_HISTORY_METHOD',
                payload: expect.any(Object)
            }
        ]);

    });

});
