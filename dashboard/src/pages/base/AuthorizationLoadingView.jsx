import React from 'react';
import { getCookieValues } from '../../scripts/cookieStorage';
import { getFromLocalStorage } from '../../scripts/localStorage';
import { setAuthorized, authRequired } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class AuthorizationLoadingView extends React.Component {

    componentWillMount() {

        // Check localstorage for a key named token
        // if the token exists, 
        const localToken = getFromLocalStorage('token');
        const cookieToken = getCookieValues('SSTToken');

        console.log('Checking for tokens...');
        if(localToken || cookieToken) {
            console.log('token found!');
            this.props.dispatch(setAuthorized(true));
        }
        const { isAuthorized, isAuthRequired } = this.props;

        this.props.dispatch(authRequired(true));
        console.log(isAuthorized, isAuthRequired);

    }

    componentWillReceiveProps(nextProps) {
        const { isAuthRequired, isAuthorized } = nextProps;

        if(!isAuthorized && isAuthRequired) {
            console.log('Redirect to login');
        }
    }

    render() {
        return (
            <div className="container fill">
                <div id="map" className="fa-lg">Checking authentication... <i className="fa fa-circle-notch fa-spin"></i></div> 
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            isAuthorized: state.authReducer.isAuthorized,
            isAuthRequired: state.authReducer.isAuthRequired
        }
    }
) (AuthorizationLoadingView);