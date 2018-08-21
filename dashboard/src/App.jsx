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

        
    // checkLogin() {
    //     fetch('http://local-bastet.sendsteps.com/index.php',{
    //         method: 'POST',
    //         headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"}
    //     }).then(res => {
    //         // console.log(res);
    //         return res.json()
    //     }).then((result) => {
    //         if(result && typeof result.authorized !== 'undefined') {
    //             this.props.dispatch(setAuthorized(result.authorized));
    //         }
    //     })
        
        
    //     // if (!sessionStorage.getItem('loggedintoken') || sessionStorage.getItem('loggedintoken') === '') {
    //     //     // return false
    //     // } 
    //     // return true 
    // }
    
    render() {

        const { isAuthorized, authChecked }  = this.props;

        if(!authChecked) {
            return <RegistrationOverview />;
        }

        if(!isAuthorized) { 
            return <AuthorizationLoadingView />;
        }

        if(isAuthorized && authChecked) {
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