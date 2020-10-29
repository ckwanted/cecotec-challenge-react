import React from "react";
import { render, cleanup, act, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import i18n from '../../i18n';
import { I18nextProvider } from 'react-i18next';
import userEvent from "@testing-library/user-event";

describe("LoginForm Component", () => {

    let mockSubmit: jest.Mock<any, any>;

    beforeEach(() => {
        mockSubmit = jest.fn();
    });

    afterEach(cleanup);

    test("Not should be called the submit method", async () => {
        
        const { getByRole } = render(
            <I18nextProvider i18n={i18n}>
                <LoginForm onSubmit={mockSubmit} />
            </I18nextProvider>
        );

        await act(async () => {
            fireEvent.click(getByRole("submit"));
        });

        expect(mockSubmit).toHaveBeenCalledTimes(0);

    });

    test("Should be called the submit method", async () => {
        
        const { getByRole } = render(
            <I18nextProvider i18n={i18n}>
                <LoginForm onSubmit={mockSubmit} />
            </I18nextProvider>
        );

        const email: string = "develop@cecotec.com";
        const password: string = "password";

        userEvent.type(getByRole("email"), email);
        userEvent.type(getByRole("password"), password);

        await act(async () => {
            fireEvent.click(getByRole("submit"));
        });

        expect(mockSubmit).toHaveBeenCalled();
        expect(mockSubmit).toHaveBeenCalledTimes(1);

    });

    test("It should show a validation error in the field email", async () => {
        
        const { getByRole, getByText } = render(
            <I18nextProvider i18n={i18n}>
                <LoginForm onSubmit={mockSubmit} />
            </I18nextProvider>
        );

        const email: string = "develop";
        const password: string = "password";

        userEvent.type(getByRole("email"), email);
        userEvent.type(getByRole("password"), password);

        await act(async () => {
            fireEvent.click(getByRole("submit"));
        });

        getByText(i18n.t('invalid_email_address'));

    });

    test("It should show a validation error in the field password", async () => {
        
        const { getByRole, getByText } = render(
            <I18nextProvider i18n={i18n}>
                <LoginForm onSubmit={mockSubmit} />
            </I18nextProvider>
        );

        const email: string = "develop";

        userEvent.type(getByRole("email"), email);

        await act(async () => {
            fireEvent.click(getByRole("submit"));
        });

        getByText(i18n.t('field_required'));

    });

});
