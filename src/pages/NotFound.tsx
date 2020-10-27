import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const NotFound = (): JSX.Element => {

    const [t] = useTranslation();

    let history = useHistory();

    return (
        <div className="box-center">
            <div className="box-error bg-gray-dark">
                <div className="box-error__error-code">
                    404
                </div>
                <div className="box-error__error-text">
                    {t("not_found")}    
                </div>
                <button 
                    className="btn mt-3"
                    onClick={() => history.goBack() }
                >
                    {t("go_back")}
                </button>
            </div>
        </div>
    )
}

export default React.memo(NotFound);
