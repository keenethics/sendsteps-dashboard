import React from 'react';
import { getCookieValues } from '../../scripts/cookieStorage';
import { getFromLocalStorage } from '../../scripts/localStorage';
import { setAuthorized, authRequired } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class AuthorizationLoadingView extends React.Component {

    componentDidMount() {

        // Check localstorage for a key named token
        // if the token exists, 
        const localToken = getFromLocalStorage('token');
        const cookieToken = getCookieValues('SSTToken');

        if(localToken || cookieToken) {
            console.log('token found')
            this.props.dispatch(setAuthorized(true));
            this.props.dispatch(authRequired(true));
            return <Redirect to="/" />
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
export default connect() (AuthorizationLoadingView);