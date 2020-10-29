import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { LabelInput } from "../../components";
import { useFormValidatorText } from "../../hooks";
import Product from '../../models/Product';

export type ProductFormInputs = {
    name: string;
    description: string;
    price: string;
}

interface ProductFormProps {
    product: Product | null;
    onSubmit: (data: ProductFormInputs) => void;
};

const ProductForm: React.FC<ProductFormProps> = (props: ProductFormProps): JSX.Element => {

    const [t] = useTranslation();

    const { handleSubmit, register, errors, reset } = useForm<ProductFormInputs>();

    useEffect(() => {
        if(props.product) reset(props.product);
    }, [props.product]);

    const _handleOnSubmit = (data: ProductFormInputs) => {
        props.onSubmit(data);
    }

    const nameRegister = register(useFormValidatorText());
    const descriptionRegister = register(useFormValidatorText());
    const priceRegister = register(useFormValidatorText());

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
                    labelTitle={t('Description')}
                    textarea
                    inputAttributes={{
                        id: "description",
                        name: "description",
                        ref: descriptionRegister,
                    }}
                    errorMessage={errors.description ? errors.description.message : null}
                    />
            </div>

            <div className="mt-2">
                <LabelInput
                    labelTitle={t('Price')}
                    inputAttributes={{
                        id: "price",
                        name: "price",
                        type:  "number",
                        min: "0",
                        defaultValue: "0",
                        ref: priceRegister,
                        
                    }}
                />
            </div>

            <div className="d-flex justify-content-end">
                <button 
                    data-testid="submit"
                    type="submit"
                    className="btn btn-sm btn-primary mt-2"
                >
                    {props.product ? t('Edit') : t('Create')}
                </button>
            </div>

        </form>
    );

};

export default React.memo(ProductForm);
