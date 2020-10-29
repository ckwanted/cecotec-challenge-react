---
to: src/<%= path %>/<%= name %>/<%= name %>.test.tsx
unless_exists: true
---
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import <%= name %> from './<%= name %>';

describe("<%= name %> Component", () => {

    afterEach(cleanup);

    test('renders learn react link', () => {
        const { getByText } = render(<<%= name %> />);
        const linkElement = getByText(/<%= name %>/i);
        expect(linkElement).toBeInTheDocument();
    });

});
