import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import PasswordResetForm from './PasswordResetForm';
import { Redirect } from 'react-router-dom';
class RegistrationOverview extends Component {
  
    render(){

      	const { currentView, isAuthorized } = this.props;

		if(isAuthorized) {
			// User is already authorized
			// and does not need to login again
			return <Redirect to={'/'} />
		}
		if(currentView === 'SIGNUP') { return <RegistrationForm /> } 
		else if (currentView === 'RECOVER') { return <PasswordResetForm /> }
		else { return <LoginForm /> }
	};
}

export default connect(
    (state) => {
        return {
			currentView: state.appReducer.currentView,
			isAuthorized: state.authReducer.isAuthorized,
        }
    }
) (RegistrationOverview);