import React from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import _ from "lodash";

interface DashboardHeaderProps {};

const DashboardHeader: React.FC<DashboardHeaderProps> = (props: DashboardHeaderProps): JSX.Element => {

    const [t] = useTranslation();
    const { user } = useSelector((store: any) => store.authReducer);

    const _renderAvatar = () => {
        return(
            <div role="button" data-toggle="dropdown">
                <div className="media align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                        <img src="/img/avatar.svg" alt="avatar photo" />
                    </span>
                    <div className="media-body ml-2 d-none d-lg-block">
                        <small className="mb-0 text-sm font-weight-bold">{_.capitalize(user?.name ?? "")}</small>
                    </div>
                </div>
                <div className="dropdown-menu header-dropdown">
                    <a 
                        className="dropdown-item"
                        href="#"
                    >
                        {t('Logout')}
                    </a>
                </div>
            </div>
        );
    }

    return(
        <header className="dashboard__header">
            <img className="dashboard__logo" src="/img/cecotec_logo.png" alt="cecotec logo"/>
            <div className="dashboard__header-items">
                <div className="container-fluid">
                    {_renderAvatar()}
                </div>
            </div>
        </header>
    );

};

export default React.memo(DashboardHeader);
