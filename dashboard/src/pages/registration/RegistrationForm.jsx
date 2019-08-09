import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setView } from 'App/actions/app';
import { authLoading, register, setAuthorized, authRequired, setUser } from 'App/actions/auth';
import { isValidEmail, isValidPassword, isValidName, isEqual, getValidationState } from 'App/scripts/validationChecker';
import { toast } from 'react-toastify';
import errorMessages from 'App/scripts/errorMessages';
import 'App/pages/registration/Forms.scss';
import { hasErrors, getRandomSuccessMessage } from 'App/scripts/errorHelper';

class RegistrationForm extends Component {

    errors = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordConfirm: null,
        termsAccepted: null,
    }
    this.props.dispatch(setLastNameError(lastNameError));
  }

    initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        termsAccepted: false,
        errors: {
            ...this.errors
        },
        showPassword: false
    }
    this.props.dispatch(setEmailError(emailError));
  }

    state = {
        ...this.initialState
    }
    this.props.dispatch(setPasswordError(passwordError));
  }

    componentWillMount() {
        this.setState({...this.initialState});
        this.props.dispatch(authLoading(false));
    }

    set = (e, property) => {
        this.setState({
            [property]: e.target.value,
            errors: { 
                ...this.state.errors, 
                [property]: null
            }
        });
    }
    this.props.dispatch(setPasswordConfirmError(passwordConfirmError));
  }

    isValidated = () => {
        const { firstName, lastName, email, password, passwordConfirm, termsAccepted, errors } = this.state

        errors.firstName = !isValidName(firstName) ? errorMessages.NAME : null;
        errors.lastName = !isValidName(lastName) ? errorMessages.NAME : null
        errors.email = !isValidEmail(email) ? errorMessages.EMAIL : null;
        errors.password = !isValidPassword(password) ? errorMessages.PASSWORD : null;
        errors.passwordConfirm = !isEqual(password, passwordConfirm) ? errorMessages.PASSWORD_CONFIRM : null;
        errors.termsAccepted = !termsAccepted ? errorMessages.TERMS : null;

        this.setState({ errors });
        return !hasErrors(errors);
    }


    showLoginForm = () => {
        this.props.dispatch(setView('LOGIN'));
    }

    showPassword = e => {
        this.setState({showPassword: !this.state.showPassword})
    }

    setAcceptTerms = e => {
        this.setState({
            termsAccepted: !this.state.termsAccepted,
            errors: {
                ...this.state.errors,
                termsAccepted: e.target.checked ? null : errorMessages.TERMS
            }
        });
    }

    attemptSignup = () => {
        if(this.isValidated()) {
            this.signup();
        }
    }

    signup = () => {
        this.props.dispatch(authLoading(true));
        register(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.password,
            this.state.passwordConfirm,
            this.state.termsAccepted,
            result => {
                console.log(result)
                // toast("Register doesn't fully work yet!");
                toast(`Registered as  ${this.props.firstName} ${this.props.lastName}`);
                this.props.dispatch(authLoading(false));
                this.props.dispatch(setAuthorized(true));
                this.props.dispatch(authRequired(true));
                this.props.dispatch(setUser(result));
            },
            error => {
                console.log(error)
                toast("Register doesn't fully work yet!")
                this.props.dispatch(authLoading(false));
            }
        )
    }

    render() {

        const { firstName, lastName, email, password, passwordConfirm, termsAccepted, showPassword, errors } = this.state;

        const { authLoading, generalError } = this.props;

        return (
            <div className="jumbotron vertical-center not-logged-in">
                <div className="col-sm-6 col-sm-offset-3 registration-form">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title mb-0">
                                <h5 className="mb-0">
                                    Register
                                    {generalError && <span className="pull-right text-danger">
                                        <i className="fa fa-exclamation-triangle"></i> {generalError}
                                    </span>}
                                </h5>
                            </div>
                        </div>
                        <div className="card-body pb-0">
                            <div className="register">
                                {authLoading && <div className="auth-loading-overlay">
                                <div className="auth-loading-content vertical-center"><i className="fa fa-circle-o-notch fa-spin"></i></div>
                                </div>}
                                <form autoComplete="off">
                                    <div className="row">
                                        <div className="col-sm-12 col-lg-6 col-md-6 col-xs-12">
                                            <div className="form-group mb-2">
                                                <label className="col-form-label col-form-label-sm">First name</label>
                                                <div className="input-group input-group-sm">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" ><i className="fa fa-user"></i></span>
                                                    </div>
                                                    <input 
                                                        required
                                                        name="first-name" 
                                                        data-lpignore='true' 
                                                        value={firstName} 
                                                        onChange={e => this.set(e, 'firstName')} 
                                                        type="text" 
                                                        className={"form-control input-sm" + getValidationState(firstName, isValidName)}
                                                        placeholder="First name" 
                                                    />
                                                    {errors.firstName && <span className="invalid-feedback d-inline pl-1 pt-1">
                                                        <i className="fa fa-exclamation-triangle fa-xs"></i> {errors.firstName}
                                                    </span>}
                                                    {isValidName(firstName) && 
                                                    <span className="valid-feedback d-inline pl-1 pt-1">
                                                        <i className="fa fa-check fa-xs"></i> {getRandomSuccessMessage(1)}
                                                    </span>}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-lg-6 col-md-6 col-xs-12">
                                            <div className="form-group mb-2">
                                                <label className="col-form-label-sm col-form-label">Last name</label>
                                                <div className="input-group input-group-sm">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" ><i className="fa fa-user"></i></span>
                                                    </div>
                                                    <input 
                                                        required
                                                        name="last-name" 
                                                        data-lpignore='true' 
                                                        value={lastName} 
                                                        onChange={e => this.set(e, 'lastName')} 
                                                        type="text" 
                                                        className={"form-control input-sm" + getValidationState(lastName, isValidName)}
                                                        placeholder="Last name" 
                                                    />
                                                    {errors.lastName && <span className="invalid-feedback d-inline pl-1 pt-1">
                                                        <i className="fa fa-exclamation-triangle fa-xs"></i> {errors.lastName}
                                                    </span>}
                                                    {isValidName(lastName) && 
                                                    <span className="valid-feedback d-inline pl-1 pt-1">
                                                        <i className="fa fa-check fa-xs"></i> {getRandomSuccessMessage(2)}
                                                    </span>}
                                                </div>
                                            </div>
                                        </div>      
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="col-form-label-sm col-form-label">Email</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" ><i className="fa fa-envelope"></i></span>
                                            </div>
                                            <input 
                                                required
                                                name="register-email"
                                                autoComplete="email"
                                                value={email}
                                                onChange={e => this.set(e, 'email')} 
                                                data-lpignore='true' 
                                                type="email" 
                                                className={"form-control input-sm" + getValidationState(email, isValidEmail)}
                                                placeholder="Enter email" 
                                            />
                                            {errors.email && <span className="invalid-feedback d-inline pl-1 pt-1">
                                                <i className="fa fa-exclamation-triangle fa-xs"></i> {errors.email}
                                            </span>}
                                            {isValidEmail(email) && <span className="valid-feedback d-inline pl-1 pt-1">
                                                <i className="fa fa-check fa-xs"></i> {getRandomSuccessMessage(3)}
                                            </span>}
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="col-form-label-sm col-form-label">Password</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" ><i className="fa fa-unlock"></i></span>
                                            </div>
                                            <input 
                                                required
                                                name="register-pass" 
                                                autoComplete="new-password"
                                                value={password} 
                                                onChange={e => this.set(e, 'password')} 
                                                data-lpignore='true' 
                                                type={showPassword ? "text" : "password"} 
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
                                                <i className="fa fa-check fa-xs"></i> {getRandomSuccessMessage(4)}
                                            </span>}
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="col-form-label-sm col-form-label">Confirm password</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" ><i className="fa fa-unlock"></i></span>
                                            </div>
                                            <input 
                                                required 
                                                name="register-pas-confirm" 
                                                value={passwordConfirm} 
                                                onChange={e => this.set(e, 'passwordConfirm')} 
                                                data-lpignore='true' 
                                                type="password" 
                                                className={"form-control input-sm" + getValidationState(passwordConfirm, e => isEqual(password, e))}
                                                placeholder="Password" 
                                            />
                                            {errors.passwordConfirm && <span className="invalid-feedback d-inline pl-1 pt-1">
                                                <i className="fa fa-exclamation-triangle fa-xs"></i> {errors.passwordConfirm}
                                            </span>}
                                            {isEqual(password, passwordConfirm) && <span className="valid-feedback d-inline pl-1 pt-1">
                                                <i className="fa fa-check fa-xs"></i> {getRandomSuccessMessage(5)}
                                            </span>}
                                        </div>
                                        
                                    </div>
                                    <hr className="mb-2 mt-3" />
                                    <div className="form-group mb-2">
                                        <div className="custom-control custom-checkbox">
                                            <input 
                                                className={"form-check-input input-sm " + getValidationState(termsAccepted, e => !!e)}
                                                required
                                                name="agreement" 
                                                onChange={this.setAcceptTerms} 
                                                checked={termsAccepted} 
                                                type="checkbox" 
                                                id="agreementCheck"
                                            />  
                                            <label className="col-form-label-sm custom-col-form-label mb-0 pb-1 pt-0" htmlFor="agreementCheck"> 
                                                I accept the license agreement & general conditions
                                            </label>
                                        </div>
                                        {errors.termsAccepted && <span className="invalid-feedback d-inline pl-1">
                                            <i className="fa fa-exclamation-triangle fa-xs"></i> {errors.termsAccepted}
                                        </span>}
                                        {!!termsAccepted && <span className="valid-feedback d-inline pl-1 pt-1">
                                            <i className="fa fa-check fa-xs"></i> {getRandomSuccessMessage(6)}
                                        </span>}
                                    </div>
                                </form>
                            </div>
                        </div>  
                        <div className="card-footer">
                            <button type="button" onClick={this.showLoginForm} className="btn btn-sm btn-outline-primary"><i className="fa fa-chevron-left"></i> Back to login</button>
                            <button type="button" onClick={this.attemptSignup} className="float-right btn btn-sm btn-primary"><i className="fa fa-sign-in-alt"></i> Sign up</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
    (state) => {
        return {
            authLoading: state.authReducer.authLoading,
        }
    }
) (RegistrationForm);
