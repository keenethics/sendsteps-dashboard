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

        const { isAuthorized, authChecked }  = this.props;
        if ('null' != authChecked  && 'null' != isAuthorized) {
            console.log('isAuthorized: '+isAuthorized+', authChecked: '+authChecked);
            if(authChecked === false) { 
                console.log('case 1.0');
                return <RegistrationOverview />;
            } else {
                if(authChecked && isAuthorized) {
                    console.log('case 2.1');
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
                } else if (isAuthorized === false) {
                    return <RegistrationOverview />;
                } else {
                    return <AuthorizationLoadingView />;
                }

            }
        } else {
            return <AuthorizationLoadingView />;            
        }
    }
}
export default withRouter(connect(
    (state) => {
        return {
            isAuthorized: state.authReducer.isAuthorized,
            authChecked: state.authReducer.authChecked
        }
    }
) (App));