import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { setView } from '../../actions/app';
import { setEmail, setPassword, setEmailError, setPasswordError, showPassword, resetLoginForm } from '../../actions/login';
import { authorizeLogin, authLoading } from '../../actions/auth';
import { isValidEmail, isValidPassword } from '../../scripts/validationChecker';
import { Panel } from 'react-bootstrap';
import './Forms.scss';

class LoginForm extends Component {

    // @TODO: apply same logic with registering/logging/loading in to the registration form, forgotpassword form etc.

    componentWillMount() {
        this.props.dispatch(resetLoginForm());
        this.props.dispatch(authLoading(false));

        // this.props.dispatch(setEmail('bryan.overduin@sendsteps.com'));
        // this.props.dispatch(setPassword('lol000')); 
    }

    showRegistrationForm() {
        this.props.dispatch(setView('SIGNUP'));
    }

    showPasswordResetForm() {
        this.props.dispatch(setView('RECOVER'));
    }

    showPassword() {
        this.props.dispatch(showPassword(!this.props.showPassword));
    }

    checkEmail(e){
        let emailError = '';
        if(!isValidEmail(e.target.value)) {
            emailError = 'Please enter a valid email';
        }
        this.props.dispatch(setEmailError(emailError));
    } 

    setEmail(e) {
        this.props.dispatch(setEmail(e.target.value));
    }

    checkPassword(e){
        let passwordError = '';
        if(!isValidPassword(e.target.value)) {
            passwordError = 'Please enter a valid password';
        }
        this.props.dispatch(setPasswordError(passwordError));
    } 

    setPassword(e) {
        this.props.dispatch(setPassword(e.target.value));
    }

    isAuthorizedToLogin() {
        const { email, password } = this.props;

        let isAuthorized = true;

        if(!isValidEmail(email)) {
            this.props.dispatch(setEmailError('Please enter a valid email'));
            isAuthorized = false;
        }
        if(!isValidPassword(password)) {
            this.props.dispatch(setPasswordError('Please enter a valid password'));
            isAuthorized = false;
        }
        return isAuthorized;
    }

    login() {

        if(this.isAuthorizedToLogin()) {
            this.props.dispatch(authLoading(true));
            const { email, password } = this.props;

            setTimeout(() => {
                this.props.dispatch(authorizeLogin(email, password));
            }, 1500)
        }
    }

    render() {

        const { email, password, emailError, passwordError, showPassword, authLoading, generalError } = this.props;

        let passwordErrorClass = passwordError ? 'has-error' : null;
        passwordErrorClass = !passwordError && isValidPassword(password) ? 'has-success' : passwordErrorClass;

        let emailErrorClass =  emailError ? 'has-error' : null;
        emailErrorClass = !emailError && isValidEmail(email) ? 'has-success' : emailErrorClass;

        return (
            <div className="jumbotron vertical-center not-logged-in">
                <div className="col-sm-6 col-sm-offset-3 login-form">
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>
                                Sign in
                                {generalError && <span className="pull-right text-danger">
                                    <i className="fa fa-exclamation-triangle"></i> {generalError}
                                </span>}
                            </Panel.Title>
                        </Panel.Heading>

                        <Panel.Body className="login">
                            {authLoading && <div className="auth-loading-overlay">
                            <div className="auth-loading-content vertical-center"><i className="fa fa-circle-o-notch fa-spin"></i></div>
                            </div>}
                            <div className={"fa-sm form-group " + emailErrorClass}>
                            <label className="control-label">Email</label>
                            <div className="input-group">
                                <span className="input-group-addon" ><i className="fa fa-user"></i></span>
                                <input name="email" onBlur={this.checkEmail.bind(this)} onChange={this.setEmail.bind(this)} value={email} type="email" className="form-control input-sm" placeholder="Enter email" />
                            </div>
                            {emailError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {emailError}</span>}
                            </div>
                            <div className={"fa-sm form-group " + passwordErrorClass}>
                            <label className="control-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-addon" ><i className="fa fa-unlock"></i></span>
                                <input onBlur={this.checkPassword.bind(this)} onChange={this.setPassword.bind(this)} value={password} type={showPassword ? "text" : "password"} name="password" className="form-control input-sm" placeholder="Password" />
                                <span onClick={this.showPassword.bind(this)} className="input-group-addon show-pass" ><i className={"fa fa-" + (showPassword ? "eye-slash" : "eye")}></i></span>
                            </div>
                            {passwordError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {passwordError}</span>}
                            </div>
                            <div className="">
                            <span onClick={this.showPasswordResetForm.bind(this)} className="fa-sm forgot-password">Forgot password?</span>
                            </div>
                        </Panel.Body>
                        <Panel.Footer>
                            <button type="button" onClick={this.showRegistrationForm.bind(this)} className="btn btn-sm btn-default"><i className="fa fa-user-plus"></i> No account yet?</button>
                            <button type="button" onClick={this.login.bind(this)} className="pull-right btn btn-sm btn-primary "><i className="fa fa-sign-in-alt"></i> Login</button>
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
            email: state.loginReducer.email,
            password: state.loginReducer.password,

            emailError: state.loginReducer.emailError,
            passwordError: state.loginReducer.passwordError,

            showPassword: state.loginReducer.showPassword,

            authLoading: state.authReducer.authLoading,
            generalError: state.authReducer.generalError
        }
    }
) (LoginForm);