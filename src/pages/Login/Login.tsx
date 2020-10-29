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
        <div className="login">
            <div className='login__box-center'>

                <div className='login__box'>
                    <div className="row">
                    
                        <div className="col-12 login__form">
                            <img className="login__logo mb-4" src="/img/cecotec_logo.png" alt="cecotec" />
                            <LoginForm
                                onSubmit={_handleOnSubmit}
                                btnLoading={isLoading}
                            />
                        </div>

                    </div>  
                </div>

            </div>
        </div>
    );

};

export default React.memo(Login);
