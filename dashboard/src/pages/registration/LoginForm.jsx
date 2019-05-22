import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { setView } from 'App/actions/app';
import { authLoading, authenticate, setAuthorized, authRequired, setGeneralError } from 'App/actions/auth';
import { isValidEmail, isValidPassword, getValidationState } from 'App/scripts/validationChecker';
import { toast } from 'react-toastify';
import { hasErrors, getRandomSuccessMessage } from 'App/scripts/errorHelper';
import errorMessages from 'App/scripts/errorMessages';
import './Forms.scss';

class LoginForm extends Component {

    errors = {
        email: null,
        password: null
    }

    initialState = {
        email: '',
        password: '',
        showPassword: false,
        errors: { ...this.errors }
    }

    state = {
        ...this.initialState
    }

    componentWillMount() {
        this.setState({ ...this.initialState });
        this.props.dispatch(authLoading(false));
    }

    showRegistrationForm = () => {
        this.props.dispatch(setView('SIGNUP'));
    }

    showPasswordResetForm = () => {
        this.props.dispatch(setView('RECOVER'));
    }

    showPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    }
   
    handleEnterKey = e => {
        if(e.key === "Enter") {
            this.login()
        }
    }

    handleLoginErrors = error => {
        if(error && error.message === 'Network request failed') {
            this.props.dispatch(setGeneralError("Unable to connect."));
        } else {
            this.setState({ 
                errors: {
                    ... this.state.errors, 
                    email: errorMessages.INVALID_CREDENTIALS
                }
            });
        }
        this.props.dispatch(authLoading(false));
        this.props.dispatch(setAuthorized(false));
        this.props.dispatch(authRequired(false));
    }

    set = (e, property) => {
        console.log('change!')
        this.setState({
            [property]: e.target.value,
            errors: { 
                ...this.state.errors, 
                [property]: null
            }
        });
    }
    
    isValidated = () => {
        const { email, password, errors } = this.state;

        errors.email = !isValidEmail(email) ? errorMessages.EMAIL : null;
        errors.password = !isValidPassword(password) ? errorMessages.PASSWORD : null;

        console.log(errors)
        this.setState({ errors });
        return !hasErrors(errors)

    }

    attemptLogin = () => {
        if(this.isValidated()) {
            this.login();
        }
    }

    login = () => {
        const { email, password } = this.state;

        this.props.dispatch(authLoading(true));

        authenticate(
            email, password,
            // Hmm, only returning the token, why not an user also? We can use this token anyways
            // To request user data.
            userData => {
                this.props.dispatch(authRequired(true))
                this.props.dispatch(setAuthorized(true))
                toast('Logged in as ' + email);
            },
            error => this.handleLoginErrors(error),                    
        )
    }

    render() {

        const { authLoading, generalError } = this.props;
        const { email, password, emailError, passwordError, showPassword, errors } = this.state;

        let passwordErrorClass = passwordError ? 'is-invalid' : null;
        passwordErrorClass = !passwordError && isValidPassword(password) ? 'is-valid' : passwordErrorClass;

        let emailErrorClass =  emailError ? 'is-invalid' : null;
        emailErrorClass = !emailError && isValidEmail(email) ? 'is-valid' : emailErrorClass;

        return (
            <div className="jumbotron vertical-center not-logged-in">
                <div className="col-sm-6 col-sm-offset-3 login-form">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title mb-0">
                                <h5 className="mb-0">
                                    Login
                                    {generalError && <span className="float-right text-danger">
                                        <i className="fa fa-exclamation-triangle"></i> {generalError}
                                    </span>}
                                </h5>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="login">
                                {authLoading && <div className="auth-loading-overlay">
                                    <div className="auth-loading-content vertical-center"><i className="fa fa-circle-o-notch fa-spin"></i></div>
                                </div>}
                                <form>
                                    <div className="form-group mb-2">
                                    <label className="col-form-label col-form-label-sm">Email</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" ><i className="fa fa-user"></i></span>
                                            </div>
                                            <input 
                                                required
                                                onKeyPress={this.handleEnterKey} 
                                                name="login-email" 
                                                onChange={e => this.set(e, 'email')} 
                                                value={email} 
                                                type="email" 
                                                className={"form-control input-sm " + getValidationState(email, isValidEmail)}
                                                placeholder="Enter email" 
                                            />
                                            {errors.email && <span className="invalid-feedback d-inline pl-1 pt-1">
                                                <i className="fa fa-exclamation-triangle fa-xs"></i> {errors.email}
                                            </span>}
                                            {(isValidEmail(email) && !errors.email) && <span className="valid-feedback d-inline pl-1 pt-1">
                                                <i className="fa fa-check fa-xs"></i> {getRandomSuccessMessage(1)}
                                            </span>}
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                    <label className="col-form-label col-form-label-sm">Password</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" ><i className="fa fa-unlock"></i></span>
                                            </div>
                                            <input 
                                                required
                                                autoComplete="new-password"
                                                onKeyPress={this.handleEnterKey} 
                                                onChange={e => this.set(e, 'password')} 
                                                value={password} 
                                                type={showPassword ? "text" : "password"}
                                                name="password" 
                                                className={"form-control input-sm" + getValidationState(password, isValidPassword)}
                                                placeholder="Password" 
                                            />
                                            <div className="input-group-append">
                                                <span onClick={this.showPassword} className="input-group-text show-pass" ><i className={"fa fa-" + (showPassword ? "eye-slash" : "eye")}></i></span>
                                            </div>
                                            {errors.password && <span className="invalid-feedback d-inline pl-1 pt-1">
                                                <i className="fa fa-exclamation-triangle fa-xs"></i> {errors.password}
                                            </span>}
                                            {isValidPassword(password) && <span className="valid-feedback d-inline pl-1 pt-1">
                                                <i className="fa fa-check fa-xs"></i> {getRandomSuccessMessage(2)}
                                            </span>}
                                        </div>
                                    </div>
                                    <span onClick={this.showPasswordResetForm} className="small forgot-password">Forgot password?</span>
                                </form>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={this.showRegistrationForm} className="btn btn-sm btn-outline-primary">
                                <i className="fa fa-user-plus"></i> No account yet?
                            </button>
                            <button type="button" onClick={this.attemptLogin} className="float-right btn btn-sm btn-primary">
                                <i className="fa fa-sign-in"></i> Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            authLoading: state.authReducer.authLoading,
            generalError: state.authReducer.generalError
        }
    }
) (LoginForm);