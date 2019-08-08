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
  setGeneralError
} from '../../actions/registration';
import {
  authLoading,
  register,
  setAuthorized,
  authRequired,
  setUser
} from '../../actions/auth';
import {
  isValidEmail,
  isValidPassword,
  isValidName
} from '../../scripts/validationChecker';
import './Forms.scss';
import { toast } from 'react-toastify';

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
    if (!this.props.firstName) {
      firstNameError = 'Please enter your first name.';
    }
    this.props.dispatch(setFirstNameError(firstNameError));
  }

  checkLastName() {
    let lastNameError = '';
    if (!this.props.lastName) {
      lastNameError = 'Please enter your last name.';
    }
    this.props.dispatch(setLastNameError(lastNameError));
  }

  checkEmail() {
    let emailError = '';
    if (!isValidEmail(this.props.email)) {
      emailError = 'Please enter a valid email.';
    }
    this.props.dispatch(setEmailError(emailError));
  }

  checkPassword() {
    let passwordError = '';
    if (!isValidPassword(this.props.password)) {
      passwordError = 'Please enter at least 8 characters.';
    }
    this.props.dispatch(setPasswordError(passwordError));
  }

  checkPasswordConfirm() {
    let passwordConfirmError = '';

    if (
      !isValidPassword(this.props.password) ||
      this.props.passwordConfirm !== this.props.password
    ) {
      passwordConfirmError = 'The selected passwords do not match.';
    }
    this.props.dispatch(setPasswordConfirmError(passwordConfirmError));
  }

  checkTerms(checked = this.props.termsAccepted) {
    let termsError = '';
    if (!checked) {
      termsError = 'Please accept the terms before signing up.';
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
    if (
      isValidName(this.props.firstName) &&
      isValidName(this.props.lastName) &&
      isValidEmail(this.props.email) &&
      isValidPassword(this.props.password) &&
      isValidPassword(this.props.passwordConfirm) &&
      this.props.termsAccepted
    ) {
      return true;
    }
    return false;
  }

  handleRegistrationErrors = error => {
    const errorMessage = error.message || 'Something went wrong during registration!';

    this.props.dispatch(
      setGeneralError(errorMessage)
    );

    this.props.dispatch(authLoading(false));
    this.props.dispatch(setAuthorized(false));
    this.props.dispatch(authRequired(false));
  };

  register() {
    if (!this.fieldsAreValid()) {
      this.errorCheck();
      return;
    }

    this.props.dispatch(authLoading(true));

    register(
      this.props.firstName,
      this.props.lastName,
      this.props.email,
      this.props.password,
      result => {
        toast(`Registered as  ${this.props.firstName} ${this.props.lastName}`);
        this.props.dispatch(authLoading(false));
        this.props.dispatch(setAuthorized(true));
        this.props.dispatch(authRequired(true));
        this.props.dispatch(setUser(result));
        console.log('User data: ', result);
      },
      error => {
        this.handleRegistrationErrors(error);
        this.props.dispatch(authLoading(false));
      }
    );
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      termsAccepted,
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      passwordConfirmError,
      termsAcceptedError,
      showPassword,
      authLoading,
      generalError
    } = this.props;

    let firstNameErrorClass = firstNameError ? 'is-invalid' : null;
    firstNameErrorClass =
      !firstNameError && firstName ? 'is-valid' : firstNameErrorClass;

    let lastNameErrorClass = lastNameError ? 'is-invalid' : null;
    lastNameErrorClass =
      !lastNameError && lastName ? 'is-valid' : lastNameErrorClass;

    let emailErrorClass = emailError ? 'is-invalid' : null;
    emailErrorClass = !emailError && email ? 'is-valid' : emailErrorClass;

    let passwordErrorClass = passwordError ? 'is-invalid' : null;
    passwordErrorClass =
      !passwordError && password ? 'is-valid' : passwordErrorClass;

    let passwordConfirmErrorClass = passwordConfirmError ? 'is-invalid' : null;
    passwordConfirmErrorClass =
      !passwordConfirmError && passwordConfirm
        ? 'is-valid'
        : passwordConfirmErrorClass;

    let termsErrorClass = termsAcceptedError ? 'is-invalid' : null;
    termsErrorClass =
      !termsAcceptedError && termsAccepted ? 'is-valid' : termsErrorClass;

    return (
      <div className="jumbotron vertical-center not-logged-in">
        <div className="col-sm-6 col-sm-offset-3 registration-form">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <strong>Register </strong>
              </h5>
              <h5 className="card-title">
                {generalError && (
                  <span className="text-danger">
                    <i className="fa fa-exclamation-triangle" /> {generalError}
                  </span>
                )}
              </h5>
              <hr />
              <div className="register">
                {authLoading && (
                  <div className="auth-loading-overlay">
                    <div className="auth-loading-content vertical-center">
                      <i className="fa fa-circle-o-notch fa-spin" />
                    </div>
                  </div>
                )}
                <form autoComplete="off">
                  <div className="row">
                    <div className="col-sm-12 col-lg-6 col-md-6 col-xs-12">
                      <div className="fa-sm form-group">
                        <label className="col-form-label">First name</label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-user" />
                            </span>
                          </div>
                          <input
                            required
                            name="first-name"
                            data-lpignore="true"
                            value={firstName}
                            onChange={this.setFirstName.bind(this)}
                            onBlur={this.checkFirstName.bind(this)}
                            type="text"
                            className={
                              'form-control input-sm ' + firstNameErrorClass
                            }
                            placeholder="First name"
                          />
                        </div>
                        {firstNameError && (
                          <span className="invalid-feedback">
                            <i className="fa fa-exclamation-triangle fa-xs" />{' '}
                            {firstNameError}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 col-md-6 col-xs-12">
                      <div className="fa-sm form-group">
                        <label className="col-form-label">Last name</label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-user" />
                            </span>
                          </div>
                          <input
                            required
                            name="last-name"
                            data-lpignore="true"
                            value={lastName}
                            onChange={this.setLastName.bind(this)}
                            onBlur={this.checkLastName.bind(this)}
                            type="text"
                            className={
                              'form-control input-sm ' + lastNameErrorClass
                            }
                            placeholder="Last name"
                          />
                        </div>
                        {lastNameError && (
                          <span className="invalid-feedback">
                            <i className="fa fa-exclamation-triangle fa-xs" />{' '}
                            {lastNameError}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="fa-sm form-group">
                    <label className="col-form-label">Email</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-envelope" />
                        </span>
                      </div>
                      <input
                        required
                        name="register-em"
                        value={email}
                        onChange={this.setEmail.bind(this)}
                        onBlur={this.checkEmail.bind(this)}
                        data-lpignore="true"
                        type="email"
                        className={'form-control input-sm ' + emailErrorClass}
                        placeholder="Enter email"
                      />
                    </div>
                    {emailError && (
                      <span className="invalid-feedback">
                        <i className="fa fa-exclamation-triangle fa-xs" />{' '}
                        {emailError}
                      </span>
                    )}
                  </div>
                  <div className="fa-sm form-group">
                    <label className="col-form-label">Password</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-unlock" />
                        </span>
                      </div>
                      <input
                        required
                        name="register-pas"
                        value={password}
                        onChange={this.setPassword.bind(this)}
                        onBlur={this.checkPassword.bind(this)}
                        data-lpignore="true"
                        type={showPassword ? 'text' : 'password'}
                        className={
                          'form-control input-sm ' + passwordErrorClass
                        }
                        placeholder="Password"
                      />
                      <div className="input-group-append">
                        <span
                          onClick={this.showPassword.bind(this)}
                          className="input-group-text show-pass"
                        >
                          <i
                            className={
                              'fa fa-' + (showPassword ? 'eye-slash' : 'eye')
                            }
                          />
                        </span>
                      </div>
                    </div>
                    {passwordError && (
                      <span className="invalid-feedback">
                        <i className="fa fa-exclamation-triangle fa-xs" />{' '}
                        {passwordError}
                      </span>
                    )}
                  </div>
                  <div className="fa-sm form-group">
                    <label className="col-form-label">Confirm password</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-unlock" />
                        </span>
                      </div>
                      <input
                        required
                        name="register-pas-confirm"
                        value={passwordConfirm}
                        onChange={this.setPasswordConfirm.bind(this)}
                        onBlur={this.checkPasswordConfirm.bind(this)}
                        data-lpignore="true"
                        type="password"
                        className={
                          'form-control input-sm ' + passwordConfirmErrorClass
                        }
                        placeholder="Password"
                      />
                    </div>
                    {passwordConfirmError && (
                      <span className="invalid-feedback">
                        <i className="fa fa-exclamation-triangle fa-xs" />{' '}
                        {passwordConfirmError}
                      </span>
                    )}
                  </div>
                  <div className="fa-sm form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        className={'form-check-input ' + termsErrorClass}
                        required
                        name="agreement"
                        onChange={this.setAcceptTerms.bind(this)}
                        checked={termsAccepted}
                        type="checkbox"
                        id="agreementCheck"
                      />
                      <label
                        className="custom-col-form-label"
                        htmlFor="agreementCheck"
                      >
                        I accept the license agreement & general conditions
                      </label>
                    </div>
                    {termsAcceptedError && (
                      <span className="invalid-feedback">
                        <i className="fa fa-exclamation-triangle fa-xs" />{' '}
                        {termsAcceptedError}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="button"
                onClick={this.showLoginForm.bind(this)}
                className="btn btn-outline-primary"
              >
                <i className="fa fa-chevron-left" /> Back to login
              </button>
              <button
                type="button"
                onClick={this.register.bind(this)}
                className="float-right btn btn-primary"
              >
                <i className="fa fa-sign-in-alt" /> Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
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

    authLoading: state.authReducer.authLoading
  };
})(RegistrationForm);
