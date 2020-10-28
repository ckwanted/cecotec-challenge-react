import React from 'react';

interface DashboardTitleProps {
    title: string;
};

const DashboardTitle: React.FC<DashboardTitleProps> = (props: DashboardTitleProps) => {

    return(
        <h5 style={{ paddingTop: '10px' }}>{props.title}</h5>
    );

};

export default React.memo(DashboardTitle);
