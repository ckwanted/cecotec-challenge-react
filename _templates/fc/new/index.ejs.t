---
to: src/<%= path %>/<%= name %>/<%= name %>.tsx
unless_exists: true
---
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface <%= name %>Props {};

const <%= name %>: React.FC<<%= name %>Props> = (props: <%= name %>Props): JSX.Element => {

    const [t] = useTranslation();

    return(
        <div>
            <%= name %>
        </div>
    );

};

export default React.memo(<%= name %>);
