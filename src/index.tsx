import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import "./i18n";
import ReactGA from "react-ga";
import Router from "./Router";

import './assets/scss/styles.scss';

ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS}`, {
    debug: process.env.NODE_ENV !== "production",
});

ReactDOM.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
