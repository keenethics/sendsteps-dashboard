import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkAuthorized, securityError } from './actions/auth';
import { simulateLoading } from './actions/api';
import { getFromLocalStorage } from './scripts/localStorage';
import { getCookieValues } from './scripts/cookieStorage';
import RegistrationOverview from './pages/registration/DetailsContainer';
import AuthorizationLoadingView from './pages/base/AuthorizationLoadingView';
import DashboardApp from './pages/base/DashboardApp';

export class App extends Component {

    componentWillMount() {

        let storedKey = getFromLocalStorage('token') || getCookieValues('SSTToken');
        if(storedKey) 
        {
            this.props.dispatch(securityError(null));
        }
        this.props.dispatch(checkAuthorized(storedKey));
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            // Show loading screen when navigating to a different 
            this.props.dispatch(simulateLoading(true));
            setTimeout(() => {
                // Disable loading screen after 500ms
                // Animate this @TODO
                this.props.dispatch(simulateLoading(false));
            }, 500);
        }
    }

    render() {

        const { isAuthorized, isAuthRequired } = this.props;

        if(isAuthRequired && isAuthorized) { return <DashboardApp /> } 
        else if (false === isAuthorized) { return <RegistrationOverview /> } 
        return <AuthorizationLoadingView />; 
    }
}
export default withRouter(connect(
    (state) => {
        return {
            isAuthorized: state.authReducer.isAuthorized,
            isAuthRequired: state.authReducer.isAuthRequired
        }
    }
) (App));