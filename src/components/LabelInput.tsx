import React from "react";

interface LabelInputProps {
    labelTitle: string;
    textarea?: boolean;
    inputAttributes: any;
    errorMessage?: string | null;
}

const LabelInput = (props: LabelInputProps) => {

    const _showErrors = () => {

        if(props.errorMessage === null || props.errorMessage?.length === 0) return null;

        return (<small className="mt-2 form__invalid-feedback">{props.errorMessage}</small>);

    }
    
    const customClasses = props.inputAttributes.classProps ? props.inputAttributes.classProps : "";

    
    return(
        <div className="form form-group">
            <label className="w-100">
                <span className="form__label">{props.labelTitle}</span>
                {props.textarea ? 
                    <textarea 
                        {...props.inputAttributes}
                        className={`w-100 mt-2 form-control form-control-sm ${customClasses}`}
                    > 
                    </textarea> :
                    <input 
                        {...props.inputAttributes}
                        className={`w-100 mt-2 form-control form-control-sm ${customClasses}`}
                    />
                }
                {_showErrors()}
            </label>
        </div>
    );
};

export default React.memo(LabelInput);
