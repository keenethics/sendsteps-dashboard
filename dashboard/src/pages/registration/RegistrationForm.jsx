import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showRegistrationForm } from '../../actions/appActions';
import { 
    setFirstName, 
    setLastName, 
    setEmail, 
    setPassword, 
    setPasswordConfirm, 
    setAcceptTerms,

    setFirstNameError,
    setLastNameError,
    setEmailError,
    setPasswordError,
    setPasswordConfirmError,
    setAcceptTermsError,

    showPassword
} from '../../actions/registrationActions';
import { isValidEmail, isValidPassword } from '../../scripts/validationChecker';

class RegistrationForm extends Component {

    showLoginForm() {
        this.props.dispatch(showRegistrationForm(false));
    }

    showPassword(e) {
        this.props.dispatch(showPassword(!this.props.showPassword));
    }

    setFirstName(e) {
        this.props.dispatch(setFirstName(e.target.value));
    }

    setLastName(e) {
        this.props.dispatch(setLastName(e.target.value));
    }

    setEmail(e) {
        this.props.dispatch(setEmail(e.target.value));
    }

    setPassword(e) {
        this.props.dispatch(setPassword(e.target.value));
    }

    setPasswordConfirm(e) {
        this.props.dispatch(setPasswordConfirm(e.target.value));
    }

    setAcceptTerms(value) {
        this.props.dispatch(setAcceptTerms(value));
    }

    checkFirstName(e) {
        let firstNameError = '';
        if(!e.target.value) {
            firstNameError = 'Please enter your first name';
        }
        this.props.dispatch(setFirstNameError(firstNameError));
    }

    checkLastName(e) {
        let lastNameError = '';
        if(!e.target.value) {
            lastNameError = 'Please enter your last name';
        }
        this.props.dispatch(setLastNameError(lastNameError));
    }

    checkEmail(e) {
        let emailError = '';
        if(!isValidEmail(e.target.value)) {
            emailError = 'Please enter a valid email';
        }
        this.props.dispatch(setEmailError(emailError));
    } 

    checkPassword(e) {
        let passwordError = '';
        if(!isValidPassword(e.target.value)) {
            passwordError = 'Please enter at least 8 characters';
        }
        this.props.dispatch(setPasswordError(passwordError));
    } 

    checkPasswordConfirm(e) {
        let passwordConfirmError = '';

        // This statement isn't working yet
        if(!isValidPassword(e.target.value) || !isValidPassword(this.props.password) && e.target.value !== this.props.password) {
            passwordConfirmError = 'The selected passwords do not match';
        }
        this.props.dispatch(setPasswordConfirmError(passwordConfirmError));
    }

    checkTerms(isAccepted) {
        let termsError = '';
        if(!isAccepted) {
            termsError = 'Please accept the terms before signing up';
        }
        this.props.dispatch(setAcceptTermsError(termsError));
    }

    render() {

        const { firstName, lastName, email, password, passwordConfirm, termsAccepted,
                firstNameError, lastNameError, emailError, passwordError, passwordConfirmError, termsAcceptedError, showPassword } = this.props;

        return (
            <div className="col-sm-6 col-sm-offset-3">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">Register</h2>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-sm-12 col-lg-6 col-md-6 col-xs-12">
                                <div className="form-group">
                                    <label className="control-label">First name</label>
                                    <div className="input-group">
                                        <span className="input-group-addon" ><i className="fa fa-user"></i></span>
                                        <input data-lpignore='true' value={firstName} onChange={this.setFirstName.bind(this)} onBlur={this.checkFirstName.bind(this)} type="text" className="form-control" placeholder="First name" />
                                    </div>
                                    {firstNameError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {firstNameError}</span>}
                                </div>
                            </div>
                            <div className="col-sm-12 col-lg-6 col-md-6 col-xs-12">
                                <div className="form-group">
                                    <label className="control-label">Last name</label>
                                    <div className="input-group">
                                        <span className="input-group-addon" ><i className="fa fa-user"></i></span>
                                        <input data-lpignore='true' value={lastName} onChange={this.setLastName.bind(this)} onBlur={this.checkLastName.bind(this)}  type="text" className="form-control" placeholder="Last name" />
                                    </div>
                                    {lastNameError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {lastNameError}</span>}
                                </div>
                            </div>      
                        </div>
                        <div className="form-group">
                            <label className="control-label">Email</label>
                            <div className="input-group">
                                <span className="input-group-addon" ><i className="fa fa-envelope"></i></span>
                                <input value={email} onChange={this.setEmail.bind(this)} onBlur={this.checkEmail.bind(this)} data-lpignore='true' type="email" className="form-control" placeholder="Enter email" />
                            </div>
                            {emailError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {emailError}</span>}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-addon" ><i className="fa fa-unlock"></i></span>
                                <input value={password} onChange={this.setPassword.bind(this)} onBlur={this.checkPassword.bind(this)} data-lpignore='true' type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" />
                                <span onClick={this.showPassword.bind(this)} className="input-group-addon show-pass" ><i className={"fa fa-" + (showPassword ? "eye-slash" : "eye")}></i></span>
                            </div>
                            {passwordError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {passwordError}</span>}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Confirm password</label>
                            <div className="input-group">
                                <span className="input-group-addon" ><i className="fa fa-unlock"></i></span>
                                <input value={passwordConfirm} onChange={this.setPasswordConfirm.bind(this)} onBlur={this.checkPasswordConfirm.bind(this)} data-lpignore='true' type="password"  className="form-control" placeholder="Password" />
                            </div>
                            {passwordConfirmError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {passwordConfirmError}</span>}
                        </div>
                        <div className="checkbox">
                            <label>
                                <input checked={termsAccepted} type="checkbox" /> I accept the license agreement & general conditions
                            </label>
                        </div>
                       {termsAcceptedError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {termsAcceptedError}</span>}

                    </div>
                    <div className="panel-footer">
                        <button type="button" onClick={this.showLoginForm.bind(this)} className="btn btn-default"><i className="fa fa-chevron-left"></i> Back to login</button>
                        <button type="button" className="pull-right btn btn-primary"><i className="fa fa-sign-in-alt"></i> Sign up</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            firstName: state.registrationReducer.firstName,
            lastName: state.registrationReducer.lastName,
            email: state.registrationReducer.email,
            password: state.registrationReducer.password,
            passwordConfirm: state.registrationReducer.passwordConfirm,
            termsAccepted: state.registrationReducer.termsAccepted,

            firstNameError: state.registrationReducer.firstNameError,
            lastNameError: state.registrationReducer.lastNameError,
            emailError: state.registrationReducer.emailError,
            passwordError: state.registrationReducer.passwordError,
            passwordConfirmError: state.registrationReducer.passwordConfirmError,
            termsAcceptedError: state.registrationReducer.termsAcceptedError,

            showPassword: state.registrationReducer.showPassword
        }
    }
) (RegistrationForm);