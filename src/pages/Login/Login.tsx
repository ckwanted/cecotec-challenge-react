import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../../actions";
import LoginForm, { LoginInputs } from "../../components/LoginForm/LoginForm";

interface LoginProps {};

const Login: React.FC<LoginProps> = (props: LoginProps): JSX.Element => {

    const dispath = useDispatch();
    const { isLoading } = useSelector((store: any) => store.authReducer);

    const _handleOnSubmit = (data: LoginInputs) => {
        dispath( actionCreator.authLogin(data.email, data.password) );
    }

    return(
        <>
            <LoginForm
                onSubmit={_handleOnSubmit}
                btnLoading={isLoading}
            />
        </>
    );

};

export default React.memo(Login);
