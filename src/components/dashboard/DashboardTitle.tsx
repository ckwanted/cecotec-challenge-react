import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import _ from "lodash";

interface DashboardTitleProps {
    title: string;
    handleAddResource?: () => void;
    onChangeText?: (text: string) => void;
};

const DashboardTitle: React.FC<DashboardTitleProps> = (props: DashboardTitleProps) => {

    const [t] = useTranslation();

    useEffect(() => {
        
        return () => {
            _handleSearchChange.cancel();
        }

    }, []);

    const _renderAddButton = () => {

        if(!props.handleAddResource) return;

        return(
            <div className="ml-auto">
                <button 
                    className="btn btn-sm btn-primary"
                    onClick={(e) => props.handleAddResource?.()}
                >
                    {t('Create')}
                </button>
            </div>
        );

    }

    const _renderSearch = () => {

        if(!props.onChangeText) return;

        return(
            <input 
                type="text"
                className="search form-control form-control-sm mt-2"
                placeholder={t('Search')}
                onChange={(e) => _handleSearchChange(e.target.value)}
            />
        );

    }

    const _handleSearchChange = _.debounce((text: string) => {
        props.onChangeText?.(text);
    }, 500)

    return(
        <>
            <div className="d-flex align-items-center">
                <h5 style={{ paddingTop: '10px' }}>{props.title}</h5>
                {_renderAddButton()}
            </div>
            {_renderSearch()}
        </>
    );

};

export default React.memo(DashboardTitle);
