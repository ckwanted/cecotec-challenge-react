import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArchive } from "@fortawesome/free-solid-svg-icons";

interface DashboardNavProps {};

const DashboardNav: React.FC<DashboardNavProps> = (props: DashboardNavProps): JSX.Element => {

    const [t] = useTranslation();

    return(
        <nav className="dashboard__nav">

            <div className="dashboard__logo-wrapper">
                <img className="dashboard__logo" src="/img/cecotec_logo.png" alt="logo"/>
            </div>

            <ul className="nav-list dashboard__separatorY">
                <li className="nav-list__item">
                    <NavLink className="nav-list__link" to="/dashboard/users">
                        <FontAwesomeIcon icon={faUser} />
                        <span className="ml-2">{t('Users')}</span>
                    </NavLink>
                </li>
                <li className="nav-list__item">
                    <NavLink className="nav-list__link" to="/dashboard/products">
                        <FontAwesomeIcon icon={faArchive} />
                        <span className="ml-2">{t('Products')}</span>
                    </NavLink>
                </li>
            </ul>
            
        </nav>
    );

};

export default React.memo(DashboardNav);
