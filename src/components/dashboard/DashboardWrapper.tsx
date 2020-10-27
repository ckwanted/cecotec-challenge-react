import React from 'react';
import DashboardHeader from "./DashboardHeader";
import DashboardNav from "./DashboardNav";

interface DashboardWrapperProps {
    children?: React.ReactNode;
};

const DashboardWrapper: React.FC<DashboardWrapperProps> = (props: DashboardWrapperProps): JSX.Element => {

    return(
        <div className="dashboard">
            <DashboardHeader />
            <DashboardNav />
            <main className="dashboard__main dashboard__separatorY">
                <div className="container-fluid">
                    {props.children}
                </div>
            </main>
        </div>
    );

};

export default React.memo(DashboardWrapper);
