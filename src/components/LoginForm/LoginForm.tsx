import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { LabelInput } from "../../components";
import { useFormValidatorEmail, useFormValidatorText } from "../../hooks";

export type LoginInputs = {
    email: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (data: LoginInputs) => void;
    btnLoading?: boolean;
};

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps): JSX.Element => {

    const [t] = useTranslation();
    const { handleSubmit, register, errors } = useForm<LoginInputs>();

    const _handleOnSubmit = (data: LoginInputs) => {
        props.onSubmit(data);
    }

    const _renderBtnSubmit = () => {
        return (
            <button 
                data-testid="submit"
                type="submit"
                className="btn mt-2"
                disabled={props.btnLoading ?? false}
            >
                {t('Login')}
            </button>
        );
    }

    const emailRegister = register(useFormValidatorEmail());
    const passwordRegister = register(useFormValidatorText());

    return(
        <form onSubmit={handleSubmit(_handleOnSubmit)}>
            
            <LabelInput
                labelTitle={t('Email')}
                inputAttributes={{
                    "data-testid": "email",
                    id: "email",
                    name: "email",
                    type:  "email",
                    placeholder: "*****@email.com",
                    autoComplete: "email",
                    ref: emailRegister,
                }}
                errorMessage={errors.email ? errors.email.message : null}
            />

            <div className="mt-2">
                <LabelInput
                    labelTitle={t('Password')}
                    inputAttributes={{
                        "data-testid": "password",
                        id: "password",
                        name: "password",
                        type:  "password",
                        placeholder: "*****",
                        autoComplete: "current-password",
                        ref: passwordRegister,
                    }}
                    errorMessage={errors.password ? errors.password.message : null}
                />
            </div>

            {_renderBtnSubmit()}

        </form>
    );

};

export default React.memo(LoginForm);
