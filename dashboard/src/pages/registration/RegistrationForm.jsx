import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setView } from '../../actions/app';
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
    showPassword,
    resetRegistrationForm,
    register
} from '../../actions/registration';
import { authLoading } from '../../actions/auth';
import { isValidEmail, isValidPassword, isValidName } from '../../scripts/validationChecker';
import { Panel } from 'react-bootstrap';

class RegistrationForm extends Component {

    componentWillMount() {
        this.props.dispatch(resetRegistrationForm());
        this.props.dispatch(authLoading(false));
    }

    showLoginForm() {
        this.props.dispatch(setView('LOGIN'));
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

    setAcceptTerms(e) {
        this.checkTerms(!this.props.termsAccepted);
        this.props.dispatch(setAcceptTerms(e.target.checked));
    }

    checkFirstName() {
        let firstNameError = '';
        if(!this.props.firstName) {
            firstNameError = 'Please enter your first name';
        }
        this.props.dispatch(setFirstNameError(firstNameError));
    }

    checkLastName() {
        let lastNameError = '';
        if(!this.props.lastName) {
            lastNameError = 'Please enter your last name';
        }
        this.props.dispatch(setLastNameError(lastNameError));
    }

    checkEmail() {
        let emailError = '';
        if(!isValidEmail(this.props.email)) {
            emailError = 'Please enter a valid email';
        }
        this.props.dispatch(setEmailError(emailError));
    } 

    checkPassword() {
        let passwordError = '';
        if(!isValidPassword(this.props.password)) {
            passwordError = 'Please enter at least 8 characters';
        }
        this.props.dispatch(setPasswordError(passwordError));
    } 

    checkPasswordConfirm() {
        let passwordConfirmError = '';

        if(!isValidPassword(this.props.password) || (this.props.passwordConfirm !== this.props.password)) {
            passwordConfirmError = 'The selected passwords do not match';
        }
        this.props.dispatch(setPasswordConfirmError(passwordConfirmError));
    }

    checkTerms(checked = this.props.termsAccepted) {
        let termsError = '';
        if(!checked) {
            termsError = 'Please accept the terms before signing up';
        }
        this.props.dispatch(setAcceptTermsError(termsError));
    }

    errorCheck() {
        this.checkFirstName();
        this.checkLastName();
        this.checkEmail();
        this.checkPassword();
        this.checkPasswordConfirm();
        this.checkTerms();
    }

    fieldsAreValid() {
        
        const { 
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
            termsAccepted,
        } = this.props;

        if( isValidName(firstName) &&
            isValidName(lastName) &&
            isValidEmail(email) &&
            isValidPassword(password) &&
            isValidPassword(passwordConfirm) &&
            termsAccepted) {
            return true;
        }
        return false;

    }

    register() {
        if(!this.fieldsAreValid()) {
            this.errorCheck();
            return;
        }

        this.props.dispatch(authLoading(true));

        const {            
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
            termsAccepted
        } = this.props;

        this.props.dispatch(register(firstName, lastName, email, password, passwordConfirm, termsAccepted));
    }

    render() {

        const { firstName, lastName, email, password, passwordConfirm, termsAccepted,
                firstNameError, lastNameError, emailError, passwordError, passwordConfirmError, termsAcceptedError, 
                showPassword, authLoading, generalError } = this.props;

        let firstNameErrorClass = firstNameError ? 'has-error' : null;
        firstNameErrorClass = !firstNameError && firstName ? 'has-success' : firstNameErrorClass;

        let lastNameErrorClass = lastNameError ? 'has-error' : null;
        lastNameErrorClass = !lastNameError && lastName ? 'has-success' : lastNameErrorClass;

        let emailErrorClass = emailError ? 'has-error' : null;
        emailErrorClass = !emailError && email ? 'has-success' : emailErrorClass;

        let passwordErrorClass = passwordError ? 'has-error' : null;
        passwordErrorClass = !passwordError && password ? 'has-success' : passwordErrorClass;

        let passwordConfirmErrorClass = passwordConfirmError ? 'has-error' : null;
        passwordConfirmErrorClass = !passwordConfirmError && passwordConfirm ? 'has-success' : passwordConfirmErrorClass;

        let termsErrorClass = termsAcceptedError ? 'has-error' : null;
        termsErrorClass = !termsAcceptedError && termsAccepted ? 'has-success' : termsErrorClass;

        return (
            <div className="jumbotron vertical-center not-logged-in">
                <div className="col-sm-6 col-sm-offset-3 registration-form">
                    <Panel>
                        <Panel.Heading>
                            <h2 className="panel-title">
                                Register 
                                {generalError && <span className="pull-right text-danger">
                                    <i className="fa fa-exclamation-triangle"></i> {generalError}
                                </span>}
                            </h2>
                        </Panel.Heading>
                        <Panel.Body className="register">
                            {authLoading && <div className="auth-loading-overlay">
                            <div className="auth-loading-content vertical-center"><i className="fa fa-circle-notch fa-spin"></i></div>
                            </div>}
                            <div className="row">
                                <div className="col-sm-12 col-lg-6 col-md-6 col-xs-12">
                                    <div className={"fa-sm form-group " + firstNameErrorClass}>
                                        <label className="control-label">First name</label>
                                        <div className="input-group">
                                            <span className="input-group-addon" ><i className="fa fa-user"></i></span>
                                            <input data-lpignore='true' value={firstName} onChange={this.setFirstName.bind(this)} onBlur={this.checkFirstName.bind(this)} type="text" className="form-control input-sm" placeholder="First name" />
                                        </div>
                                        {firstNameError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {firstNameError}</span>}
                                    </div>
                                </div>
                                <div className="col-sm-12 col-lg-6 col-md-6 col-xs-12">
                                    <div className={"fa-sm form-group " + lastNameErrorClass}>
                                        <label className="control-label">Last name</label>
                                        <div className="input-group">
                                            <span className="input-group-addon" ><i className="fa fa-user"></i></span>
                                            <input data-lpignore='true' value={lastName} onChange={this.setLastName.bind(this)} onBlur={this.checkLastName.bind(this)}  type="text" className="form-control input-sm" placeholder="Last name" />
                                        </div>
                                        {lastNameError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {lastNameError}</span>}
                                    </div>
                                </div>      
                            </div>
                            <div className={"fa-sm form-group " + emailErrorClass}>
                                <label className="control-label">Email</label>
                                <div className="input-group">
                                    <span className="input-group-addon" ><i className="fa fa-envelope"></i></span>
                                    <input value={email} onChange={this.setEmail.bind(this)} onBlur={this.checkEmail.bind(this)} data-lpignore='true' type="email" className="form-control input-sm" placeholder="Enter email" />
                                </div>
                                {emailError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {emailError}</span>}
                            </div>
                            <div className={"fa-sm form-group " + passwordErrorClass}>
                                <label className="control-label">Password</label>
                                <div className="input-group">
                                    <span className="input-group-addon" ><i className="fa fa-unlock"></i></span>
                                    <input value={password} onChange={this.setPassword.bind(this)} onBlur={this.checkPassword.bind(this)} data-lpignore='true' type={showPassword ? "text" : "password"} className="form-control input-sm" placeholder="Password" />
                                    <span onClick={this.showPassword.bind(this)} className="input-group-addon show-pass" ><i className={"fa fa-" + (showPassword ? "eye-slash" : "eye")}></i></span>
                                </div>
                                {passwordError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {passwordError}</span>}
                            </div>
                            <div className={"fa-sm form-group " + passwordConfirmErrorClass}>
                                <label className="control-label">Confirm password</label>
                                <div className="input-group">
                                    <span className="input-group-addon" ><i className="fa fa-unlock"></i></span>
                                    <input value={passwordConfirm} onChange={this.setPasswordConfirm.bind(this)} onBlur={this.checkPasswordConfirm.bind(this)} data-lpignore='true' type="password"  className="form-control input-sm" placeholder="Password" />
                                </div>
                                {passwordConfirmError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {passwordConfirmError}</span>}
                            </div>
                            <div className={"fa-sm form-group " + termsErrorClass}>
                                <div className="checkbox">
                                <label>
                                    <input onChange={this.setAcceptTerms.bind(this)} checked={termsAccepted} type="checkbox" /> <strong>I accept the license agreement & general conditions</strong>
                                </label>
                            </div>
                            {termsAcceptedError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {termsAcceptedError}</span>}
                            </div>
                        </Panel.Body>
                        <Panel.Footer>
                            <button type="button" onClick={this.showLoginForm.bind(this)} className="btn btn-sm btn-default"><i className="fa fa-chevron-left"></i> Back to login</button>
                            <button type="button" onClick={this.register.bind(this)} className="pull-right btn btn-sm btn-primary"><i className="fa fa-sign-in-alt"></i> Sign up</button>
                        </Panel.Footer>
                    </Panel>
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
            generalError: state.registrationReducer.generalError,

            showPassword: state.registrationReducer.showPassword,

            authLoading: state.authReducer.authLoading,
        }
    }
) (RegistrationForm);