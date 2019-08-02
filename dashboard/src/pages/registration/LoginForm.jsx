import React, { Component } from "react";
import { connect } from "react-redux";
import { setView } from "../../actions/app";
import {
  setEmail,
  setPassword,
  setEmailError,
  setPasswordError,
  showPassword,
  resetLoginForm
} from "../../actions/login";
import {
  authLoading,
  authenticate,
  setAuthorized,
  authRequired,
  setGeneralError
} from "../../actions/auth";
import { isValidEmail, isValidPassword } from "../../scripts/validationChecker";
import "./Forms.scss";
import { toast } from "react-toastify";

class LoginForm extends Component {
  // @TODO: apply same logic with registering/logging/loading in to the registration form, forgotpassword form etc.

  componentWillMount() {
    this.props.dispatch(resetLoginForm());
    this.props.dispatch(authLoading(false));
  }

  showRegistrationForm() {
    this.props.dispatch(setView("SIGNUP"));
  }

  showPasswordResetForm() {
    this.props.dispatch(setView("RECOVER"));
  }

  showPassword() {
    this.props.dispatch(showPassword(!this.props.showPassword));
  }

  checkEmail(e) {
    let emailError = "";
    if (!isValidEmail(e.target.value)) {
      emailError = "Please enter a valid email.";
    }
    this.props.dispatch(setEmailError(emailError));
  }

  setEmail(e) {
    this.props.dispatch(setEmail(e.target.value));
  }

  checkPassword(e) {
    let passwordError = "";
    if (!isValidPassword(e.target.value)) {
      passwordError = "Please enter a valid password.";
    }
    this.props.dispatch(setPasswordError(passwordError));
  }

  setPassword(e) {
    this.props.dispatch(setPassword(e.target.value));
  }

  isAuthorizedToLogin() {
    const { email, password } = this.props;

    let isAuthorized = true;

    if (!isValidEmail(email)) {
      this.props.dispatch(setEmailError("Please enter a valid email."));
      isAuthorized = false;
    }
    if (!isValidPassword(password)) {
      this.props.dispatch(setPasswordError("Please enter a valid password."));
      isAuthorized = false;
    }
    return isAuthorized;
  }

  handleEnterKey = e => {
    if (e.key === "Enter") {
      this.login();
    }
  };

  handleLoginErrors = error => {
    if (error && error.message === "Network request failed") {
      this.props.dispatch(
        setGeneralError("Unable to connect. Please try again later.")
      );
    } else {
      this.props.dispatch(
        setEmailError("Email and password combination not recognised.")
      );
    }
    this.props.dispatch(authLoading(false));
    this.props.dispatch(setAuthorized(false));
    this.props.dispatch(authRequired(false));
  };

  handleLoginSuccess = userData => {};

  login = () => {
    if (this.isAuthorizedToLogin()) {
      const { email, password } = this.props;
      this.props.dispatch(authLoading(true));
      authenticate(
        email,
        password,
        // Hmm, only returning the token, why not an user also? We can use this token anyways
        // To request user data.
        userData => {
          this.props.dispatch(authRequired(true));
          this.props.dispatch(setAuthorized(true));
          toast("Logged in as " + email);
        },
        error => this.handleLoginErrors(error)
      );
    }
  };

  render() {
    const {
      email,
      password,
      emailError,
      passwordError,
      showPassword,
      authLoading,
      generalError
    } = this.props;

    let passwordErrorClass = passwordError ? "is-invalid" : null;
    passwordErrorClass =
      !passwordError && isValidPassword(password)
        ? "is-valid"
        : passwordErrorClass;

    let emailErrorClass = emailError ? "is-invalid" : null;
    emailErrorClass =
      !emailError && isValidEmail(email) ? "is-valid" : emailErrorClass;

    return (
      <div className="jumbotron vertical-center not-logged-in">
        <div className="col-sm-6 col-sm-offset-3 login-form">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <strong>Sign in</strong>
                {generalError && (
                  <span className="pull-right text-danger">
                    <i className="fa fa-exclamation-triangle" /> {generalError}
                  </span>
                )}
              </h5>
              <hr />
              <div className="login">
                {authLoading && (
                  <div className="auth-loading-overlay">
                    <div className="auth-loading-content vertical-center">
                      <i className="fa fa-circle-o-notch fa-spin" />
                    </div>
                  </div>
                )}
                <form>
                  <div className="fa-sm form-group">
                    <label className="col-form-label">Email</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user" />
                        </span>
                      </div>
                      <input
                        required
                        onKeyPress={this.handleEnterKey}
                        name="email"
                        onBlur={this.checkEmail.bind(this)}
                        onChange={this.setEmail.bind(this)}
                        value={email}
                        type="email"
                        className={"form-control input-sm " + emailErrorClass}
                        placeholder="Enter email"
                      />
                    </div>
                    {emailError && (
                      <span className="invalid-feedback">
                        <i className="fa fa-exclamation-triangle fa-xs" />{" "}
                        {emailError}
                      </span>
                    )}
                  </div>
                  <div className={"fa-sm form-group " + passwordErrorClass}>
                    <label className="col-form-label">Password</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-unlock" />
                        </span>
                      </div>
                      <input
                        required
                        onKeyPress={this.handleEnterKey}
                        onBlur={this.checkPassword.bind(this)}
                        onChange={this.setPassword.bind(this)}
                        value={password}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={"form-control input-sm" + emailErrorClass}
                        placeholder="Password"
                      />
                      <div className="input-group-append">
                        <span
                          onClick={this.showPassword.bind(this)}
                          className="input-group-text show-pass"
                        >
                          <i
                            className={
                              "fa fa-" + (showPassword ? "eye-slash" : "eye")
                            }
                          />
                        </span>
                      </div>
                    </div>
                    {passwordError && (
                      <span className="invalid-feedback">
                        <i className="fa fa-exclamation-triangle fa-xs" />{" "}
                        {passwordError}
                      </span>
                    )}
                  </div>
                  <span
                    onClick={this.showPasswordResetForm.bind(this)}
                    className="fa-sm forgot-password"
                  >
                    Forgot password?
                  </span>
                </form>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="button"
                onClick={this.showRegistrationForm.bind(this)}
                className="btn btn-outline-primary"
              >
                <i className="fa fa-user-plus" /> No account yet?
              </button>
              <button
                type="button"
                onClick={this.login.bind(this)}
                className="float-right btn btn-primary"
              >
                <i className="fa fa-sign-in-alt" /> Login
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
    email: state.loginReducer.email,
    password: state.loginReducer.password,

    emailError: state.loginReducer.emailError,
    passwordError: state.loginReducer.passwordError,

    showPassword: state.loginReducer.showPassword,

    authLoading: state.authReducer.authLoading,
    generalError: state.authReducer.generalError
  };
})(LoginForm);
