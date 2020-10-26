import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LoginProps {};

const Login: React.FC<LoginProps> = (props: LoginProps): JSX.Element => {

    const [t] = useTranslation();

    return(
        <div>
            Login
        </div>
    );

};

export default React.memo(Login);
