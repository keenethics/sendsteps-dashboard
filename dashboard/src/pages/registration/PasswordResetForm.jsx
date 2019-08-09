import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { setView } from 'App/actions/app';
import { isValidEmail, getValidationState } from 'App/scripts/validationChecker';
import { postNew } from 'App/scripts/api';
import ToastComponent from 'App/components/common/ToastComponent'
import { toast } from "react-toastify";
import errorMessages from 'App/scripts/errorMessages';
import { getRandomSuccessMessage } from 'App/scripts/errorHelper';
import './Forms.scss';

class PasswordResetForm extends Component {

    state = {
        recoveringEmail: '',
        error: null
    }

    showLoginForm = () => {
        this.props.dispatch(setView(null));
    }

    attemptRecovery = () => {
        if(this.isValidated()) {
            this.recover();
        }
    }

    isValidated = () => {
        let { recoveringEmail, error } = this.state;
        error = !isValidEmail(recoveringEmail) ? errorMessages.EMAIL : null
        this.setState({error});
        return !error;
    }

    setRecoveringEmail = e => {
        this.setState({recoveringEmail: e.target.value});
    }

    recover() {
      const { recoveringEmail } = this.props;
      if(!this.props.recoveringEmailError && recoveringEmail) {
        postNew(
          '/api/user/requestPasswordReset',
          { email: recoveringEmail },
          result => {
            const { success, error } = result;
            toast(success || error);
          },
          error => {
            toast(error);
          }
        )
      }
    }

    render() {

        const { recoveringEmail, error } = this.state;

        return (
            <div className="jumbotron vertical-center not-logged-in">
                <div className="col-sm-6 col-sm-offset-3 password-reset-form">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title mb-0">
                                <h5 className="mb-0">
                                    Request password reset
                                </h5>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label className="col-form-label col-form-label-sm">Enter your email to reset your password</label>
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" ><i className="fa fa-user"></i></span>
                                    </div>
                                    <input 
                                        onChange={this.setRecoveringEmail} 
                                        value={recoveringEmail} 
                                        data-lpignore='true' 
                                        type="email" 
                                        className={"form-control" + getValidationState(recoveringEmail, isValidEmail)} 
                                        placeholder="Enter email" 
                                    />
                                     {error && <span className="invalid-feedback d-inline pl-1 pt-1">
                                        <i className="fa fa-exclamation-triangle fa-xs"></i> {error}
                                    </span>}
                                    {isValidEmail(recoveringEmail) && 
                                    <span className="valid-feedback d-inline pl-1 pt-1">
                                        <i className="fa fa-check fa-xs"></i> {getRandomSuccessMessage(1)}
                                    </span>}
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={this.showLoginForm} className="btn btn-sm btn-outline-secondary"><i className="fa fa-chevron-left"></i> Back to login</button>
                            <button type="button" onClick={this.attemptRecovery} className="pull-right btn btn-sm btn-primary"><i className="fa fa-sign-in-alt"></i> Reset</button>
                        </div>
                    </div>
                </div>
                <ToastComponent />
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            recoveringEmail: state.loginReducer.recoveringEmail,
            recoveringEmailError: state.loginReducer.recoveringEmailError
        }
    }
) (PasswordResetForm);