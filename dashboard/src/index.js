// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// Polyfills for < IE11
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
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
registerServiceWorker();