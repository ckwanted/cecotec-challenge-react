import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const NotFound = (): JSX.Element => {

    const [t] = useTranslation();

    let history = useHistory();

    return (
        <div>
            <div>
                404
            </div>
            <button 
                className="btn mt-3"
                onClick={() => history.goBack() }
            >
                {t("go_back")}
            </button>
        </div>
    )
}

export default React.memo(NotFound);
