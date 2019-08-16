import React, { Component } from 'react';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { connect } from 'react-redux';
import { post } from '../../../../scripts/api';
import { toast } from 'react-toastify';
import { setResponseSiteSettings } from '../actions';

class ResponseCodeInput extends Component {
  validateResponseCode = () => {
    // checkResponseCode
    post(
      null,
      'response/checkCode',
      {
        keyword: this.props.settings.textmessagingkeyword,
        userId: this.props.currentUser.userId
      },
      ({ result }) => {
        if (!result) {
          toast('This response code already exists!');
        }
      },
      error => {
        toast('Unable to check response code...' + error.message);
      }
    );
  };

  updateSettings = (value, field) => {
    const newSettings = { ...this.props.settings };
    newSettings[field] = value;
    this.props.dispatch(setResponseSiteSettings(newSettings));
  };

  render() {
    const { settings, currentUser } = this.props;

    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label col-form-label-sm text-right">
          Response Code{' '}
          <TooltipNotification
            title={'Response Code'}
            tooltip={
              <span className="text-left">
                <h5>Response Code</h5>
                <p>Formulate a response code to allow audience access to your session. </p>
                <p>
                  Attendees will use the response code with one of the following response methods:
                </p>
                <ul className="list-group">
                  <li>
                    <strong>Web: </strong> For web responses, attendees use the response code as a
                    login to the response website.
                  </li>
                  <br />
                  <li>
                    <strong>SMS: </strong> For SMS responses, attendees will start a SMS response
                    with the response code.
                  </li>
                </ul>
              </span>
            }
          >
            <i className="fa fa-question-circle" />
          </TooltipNotification>
        </label>
        {settings && (
          <div className="col-sm-6">
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-laptop" />
                </span>
              </div>
              <input
                onBlur={this.validateResponseCode}
                type="text"
                onChange={e => this.updateSettings(e.target.value, 'textmessagingkeyword')}
                value={settings.textmessagingkeyword}
                className="input-lg form-control"
                placeholder=""
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => {
  return {
    settings: state.responseSettingsReducer.settings,
    currentUser: state.authReducer.currentUser
  };
})(ResponseCodeInput);
