import React from "react";
import { useTranslation } from 'react-i18next';
import User, { getAvatarUrl } from "../../models/User";
import { useSelector } from "react-redux";
import _ from "lodash";
import HamburgerMenu from "react-hamburger-menu";

interface DashboardHeaderProps {};

const DashboardHeader: React.FC<DashboardHeaderProps> = (props: DashboardHeaderProps): JSX.Element => {

    const [t] = useTranslation();
    const authReducer = useSelector((store: any) => store.authReducer);
    const user: User | null = authReducer?.user;

    const _renderAvatar = () => {
        return(
            <div role="button" data-toggle="dropdown">
                <div className="media align-items-center">
                    <img src={getAvatarUrl(user)} className="avatar" alt="avatar photo" />
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
        <header className="dashboard__header container-fluid">
            <div className="dashboard__hamburger-menu">
                <HamburgerMenu
                    isOpen={false}
                    menuClicked={() => {

                    }}
                    width={18}
                    height={15}
                    strokeWidth={1}
                    rotate={0}
                    color='black'
                    borderRadius={0}
                    animationDuration={0.5}
                />
            </div>
            <img className="dashboard__logo" src="/img/cecotec_logo.png" alt="cecotec logo"/>
            <div className="dashboard__header-items">
                {_renderAvatar()}
            </div>
        </header>
    );

};

export default React.memo(DashboardHeader);
