import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Login from './Login';
import i18n from '../../i18n';
import { I18nextProvider } from 'react-i18next';


describe("Login Component", () => {

    afterEach(cleanup);

    test('renders learn react link', () => {
        const { getByText } = render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );
        const linkElement = getByText(/Login/i);
        expect(linkElement).toBeInTheDocument();
    });

});
