import React from "react";

interface DashboardHeaderProps {};

const DashboardHeader: React.FC<DashboardHeaderProps> = (props: DashboardHeaderProps): JSX.Element => {

    return(
        <header className="dashboard__header">
            <img className="dashboard__logo" src="/img/cecotec_logo.png" alt="logo"/>
        </header>
    );

};

export default React.memo(DashboardHeader);
