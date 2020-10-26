import React from "react";

interface CactusLabelInputProps {
    labelTitle: string;
    inputAttributes: any;
    errorMessage?: string | null;
}

const LabelInput = (props: CactusLabelInputProps) => {

    const _showErrors = () => {

        if(props.errorMessage === null || props.errorMessage?.length === 0) return null;

        return (<div className="mt-2 form__invalid-feedback font-weight-bold">{props.errorMessage}</div>);

    }
    
    const customClasses = props.inputAttributes.classProps ? props.inputAttributes.classProps : "";
    
    return(
        <label className="w-100">
            <span className="form__label">{props.labelTitle}</span>
            <input 
                {...props.inputAttributes}
                className={`w-100 mt-2 ${customClasses}`}
            />
            {_showErrors()}
        </label>
    );
};

export default React.memo(LabelInput);
