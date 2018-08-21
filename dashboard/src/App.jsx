import React, { Component } from 'react';
import Routes from './Routes';
import SideMenu from './components/menu/SideMenu';
import Header from './components/menu/Header';
import RegistrationOverview from './pages/registration/Details';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkAuthorized } from './actions/authActions';
import AuthorizationLoadingView from './pages/base/AuthorizationLoadingView';
export class App extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(checkAuthorized());
    }
    
    render() {

        const { isAuthorized, authChecked }  = this.props;
        console.log('authChecked: '+authChecked + ', isAuthorized: '+isAuthorized);
        if(!authChecked && !isAuthorized) { 
            console.log('case 1');
            return <AuthorizationLoadingView />;
        } else if(authChecked && !isAuthorized) { 
            console.log('case 2');
            return <RegistrationOverview />;
        } else if(authChecked && isAuthorized) {
             
            console.log('case 3');
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
        }

        else return <AuthorizationLoadingView />;
      
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