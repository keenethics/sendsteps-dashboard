import React, { Component } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import PasswordResetForm from "./PasswordResetForm";
class RegistrationOverview extends Component {
  render() {
    const { currentView } = this.props;

    if (currentView === "SIGNUP") {
      return <RegistrationForm />;
    } else if (currentView === "RECOVER") {
      return <PasswordResetForm />;
    } else {
      return <LoginForm />;
    }
  }
}

export default connect(state => {
  return {
    currentView: state.appReducer.currentView,
    isAuthorized: state.authReducer.isAuthorized
  };
})(RegistrationOverview);
