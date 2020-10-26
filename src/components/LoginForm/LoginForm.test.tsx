import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LoginForm from './LoginForm';

describe("LoginForm Component", () => {

    afterEach(cleanup);

    test('renders learn react link', () => {
        const { getByText } = render(<LoginForm />);
        const linkElement = getByText(/LoginForm/i);
        expect(linkElement).toBeInTheDocument();
    });

});
