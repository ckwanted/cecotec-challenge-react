import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const NotFound = (): JSX.Element => {

    const [t] = useTranslation();

    let history = useHistory();

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">

            <div className="w-25">
                <h1 className="text-center">404</h1>
                <button 
                    className="btn btn-primary btn-block mt-3"
                    onClick={() => history.goBack() }
                >
                    {t("go_back")}
                </button>
            </div>

        </div>
    )
}

export default React.memo(NotFound);
