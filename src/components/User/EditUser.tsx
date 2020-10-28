import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { LabelInput } from "../../components";
import { useFormValidatorEmail, useFormValidatorText } from "../../hooks";
import User from '../../models/User';

export type EditUserInputs = {
    name: string;
    email: string;
}

interface EditUserProps {
    user: User | null;
    onSubmit: (data: EditUserInputs) => void;
};

const EditUser: React.FC<EditUserProps> = (props: EditUserProps): JSX.Element => {

    const [t] = useTranslation();
    const { handleSubmit, register, errors, reset } = useForm<EditUserInputs>();

    useEffect(() => {
        if(props.user) reset(props.user);
    }, [props.user]);

    const _handleOnSubmit = (data: EditUserInputs) => {
        props.onSubmit(data);
    }

    const nameRegister = register(useFormValidatorText());
    const emailRegister = register(useFormValidatorEmail());

    return(
        <form onSubmit={handleSubmit(_handleOnSubmit)}>
            
            <LabelInput
                labelTitle={t('Name')}
                inputAttributes={{
                    id: "name",
                    name: "name",
                    type:  "text",
                    ref: nameRegister,
                }}
                errorMessage={errors.name ? errors.name.message : null}
            />

            <div className="mt-2">
                <LabelInput
                    labelTitle={t('Email')}
                    inputAttributes={{
                        id: "email",
                        name: "email",
                        type:  "email",
                        placeholder: "*****@email.com",
                        ref: emailRegister,
                    }}
                    errorMessage={errors.email ? errors.email.message : null}
                />
            </div>

            <div className="d-flex justify-content-end">
                <button 
                    data-testid="submit"
                    type="submit"
                    className="btn btn-sm btn-primary mt-2"
                >
                    {t('Edit')}
                </button>
            </div>

        </form>
    );

};

export default React.memo(EditUser);
