import React, { Component } from 'react';
import Routes from './Routes';
import SideMenu from './components/menu/SideMenu';
import Header from './components/menu/Header';
import RegistrationOverview from './pages/registration/DetailsContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkAuthorized, setAuthorized } from './actions/authActions';
import AuthorizationLoadingView from './pages/base/AuthorizationLoadingView';
export class App extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(checkAuthorized());
    }
   
    render() {
        const { isAuthorized, authRequired }  = this.props;
        //Auth required & the result of authorization should be known, before anyone gets past the login screen
        if(true === authRequired && true === isAuthorized) {
            return (
                <div className="App">
                    <Header />
                    <div className="wrapper">
                        <SideMenu />
                        <div className="view">
                            <Routes />
                        </div>
                    </div>
                </div>
            ); 
        } else if (null == authRequired  || null == isAuthorized) {
            return <AuthorizationLoadingView />; 
        } else {
            return <RegistrationOverview />;
        }
    }
}
export default withRouter(connect(
    (state) => {
        return {
            isAuthorized: state.authReducer.isAuthorized,
            authRequired: state.authReducer.authRequired
        }
    }
) (App));