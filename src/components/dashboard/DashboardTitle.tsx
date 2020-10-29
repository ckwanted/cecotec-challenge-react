import React from 'react';
import { useTranslation } from 'react-i18next';

interface DashboardTitleProps {
    title: string;
    handleAddResource?: () => void;
};

const DashboardTitle: React.FC<DashboardTitleProps> = (props: DashboardTitleProps) => {

    const [t] = useTranslation();

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

    return(
        <div className="d-flex align-items-center">
            <h5 style={{ paddingTop: '10px' }}>{props.title}</h5>
            {_renderAddButton()}
        </div>
    );

};

export default React.memo(DashboardTitle);
