import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { setView } from '../../actions/app';
import { setRecoveringEmailError, setRecoveringEmail } from '../../actions/login';
import { isValidEmail } from '../../scripts/validationChecker';

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
        if(!this.props.recoveringEmailError && this.props.recoveringEmail) {
            alert('Sending reset request... (Not really)');
        }
    }


    render() {

        const { recoveringEmail, recoveringEmailError } = this.props;

        let emailErrorClass =  recoveringEmailError? 'has-error' : null;
        emailErrorClass = !recoveringEmailError && recoveringEmail ? 'has-success' : emailErrorClass;

        return (
            <div className="jumbotron vertical-center not-logged-in">
                <div className="col-sm-6 col-sm-offset-3 password-reset-form">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h2 className="panel-title">Request password reset</h2>
                        </div>
                        <div className="panel-body">
                            <div className={"fa-sm form-group " + emailErrorClass}>
                                <label className="control-label">Enter your email to reset your password</label>
                                <div className="input-group">
                                    <span className="input-group-addon" ><i className="fa fa-user"></i></span>
                                    <input onBlur={this.checkRecoveringEmail.bind(this)} onChange={this.setRecoveringEmail.bind(this)} value={recoveringEmail} data-lpignore='true' type="email" className="form-control input-sm" placeholder="Enter email" />
                                </div>
                                {recoveringEmailError && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {recoveringEmailError}</span>}
                            </div>
                        </div>
                        <div className="panel-footer">
                            <button type="button" onClick={this.showLoginForm.bind(this)} className="btn btn-sm btn-default"><i className="fa fa-chevron-left"></i> Back to login</button>
                            <button type="button" onClick={this.resetEmail.bind(this)} className="pull-right btn btn-sm btn-primary"><i className="fa fa-sign-in-alt"></i> Reset</button>
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
            recoveringEmail: state.loginReducer.recoveringEmail,
            recoveringEmailError: state.loginReducer.recoveringEmailError
        }
    }
) (PasswordResetForm);