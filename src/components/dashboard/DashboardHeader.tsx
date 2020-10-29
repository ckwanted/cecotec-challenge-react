import React, { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import User, { getAvatarUrl } from "../../models/User";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../../actions";
import _ from "lodash";
import HamburgerMenu from "react-hamburger-menu";

interface DashboardHeaderProps {};

const DashboardHeader: React.FC<DashboardHeaderProps> = (props: DashboardHeaderProps): JSX.Element => {

    const [t] = useTranslation();
    const dropdownItemsEl = useRef<any>(null);
    const { isOpenNav } = useSelector((store: any) => store.dashboardReducer);
    const dispath = useDispatch();
    const authReducer = useSelector((store: any) => store.authReducer);
    const user: User | null = authReducer?.user;

    useEffect(() => {

        window.addEventListener('mousedown', _handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', _handleClickOutside);
        }

    }, []);

    const _handleClickOutside = (e: any) => {
        if(dropdownItemsEl && !dropdownItemsEl.current?.contains(e.target)) {
            dropdownItemsEl.current.classList.remove("dashboard__dropdown__items--active");
        }
    }

    const _openDropdown = () => {
        let itemActiveClass: string = "dashboard__dropdown__items--active";
        dropdownItemsEl.current?.classList.add(itemActiveClass);
    }

    const _renderAvatar = () => {
        return(
            <div className="dashboard__dropdown">
                <div className="media align-items-center">
                    <img src={getAvatarUrl(user)} className="avatar" alt="avatar photo" />
                    <div className="media-body ml-2 d-none d-lg-block">
                        <small className="mb-0 text-sm font-weight-bold">{_.capitalize(user?.name ?? "")}</small>
                    </div>
                </div>
                <div ref={dropdownItemsEl} className="dashboard__dropdown__items">
                    <a 
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            dispath( actionCreator.authLogout() );
                        }}
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
                    isOpen={isOpenNav}
                    menuClicked={() => {
                        dispath( actionCreator.dashboardToggleNav() );
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
            <div className="dashboard__header-items" onClick={() => _openDropdown()}>
                {_renderAvatar()}
            </div>
        </header>
    );

};

export default React.memo(DashboardHeader);
