'use-strict';

// Polyfills for < IE11
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import { polyfill } from 'es6-promise'; 
import 'babel-polyfill';
polyfill();

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.scss";
import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);