import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { setView } from '../../actions/app';
import { setRecoveringEmailError, setRecoveringEmail } from '../../actions/login';
import { isValidEmail } from '../../scripts/validationChecker';
import { postNew } from '../../scripts/api';
import './Forms.scss';
import ToastComponent from '../../components/common/ToastComponent'
import { toast } from "react-toastify";

class PasswordResetForm extends Component {


    showLoginForm() {
        this.props.dispatch(setView(null));
    }

    checkRecoveringEmail() {
        let emailError = '';
        if(!isValidEmail(this.props.recoveringEmail)) {
            emailError = 'Please enter a valid email';
        }
        this.props.dispatch(setRecoveringEmailError(emailError));
    } 

    setRecoveringEmail(e) {
        this.props.dispatch(setRecoveringEmail(e.target.value));
    }

    resetEmail() {
        this.checkRecoveringEmail();
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

        const { recoveringEmail, recoveringEmailError } = this.props;

        let emailErrorClass =  recoveringEmailError? 'has-error' : null;
        emailErrorClass = !recoveringEmailError && recoveringEmail ? 'has-success' : emailErrorClass;

        return (
            <div className="jumbotron vertical-center not-logged-in">
                <div className="col-sm-6 col-sm-offset-3 password-reset-form">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                Request password reset
                            </div>
                        </div>
                        <div className="card-body">
                            <div className={"fa-sm form-group " + emailErrorClass}>
                                <label className="col-form-label">Enter your email to reset your password</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" ><i className="fa fa-user"></i></span>
                                    </div>
                                    <input onBlur={this.checkRecoveringEmail.bind(this)} onChange={this.setRecoveringEmail.bind(this)} value={recoveringEmail} data-lpignore='true' type="email" className="form-control" placeholder="Enter email" />
                                </div>
                                {recoveringEmailError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {recoveringEmailError}</span>}
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={this.showLoginForm.bind(this)} className="btn btn-outline-secondary"><i className="fa fa-chevron-left"></i> Back to login</button>
                            <button type="button" onClick={this.resetEmail.bind(this)} className="pull-right btn btn-primary"><i className="fa fa-sign-in-alt"></i> Reset</button>
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