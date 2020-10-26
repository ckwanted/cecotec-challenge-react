import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import nprogress from 'nprogress';
import ReactGA from "react-ga";

export interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper = (props: PageWrapperProps): JSX.Element => {
    
    let location = useLocation();
    
    nprogress.start();

    useEffect(() => {
        ReactGA.pageview(location.pathname);
        nprogress.done();
    }, [location]);

    return(
        <>{props.children}</>
    );

};

export default React.memo(PageWrapper);
