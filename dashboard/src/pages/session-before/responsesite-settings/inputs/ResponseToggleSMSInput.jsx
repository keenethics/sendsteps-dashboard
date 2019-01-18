import React, { Component } from 'react';
import ButtonSwitch from '../../../../components/common/ButtonSwitch';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { setResponseSiteSettings } from '../actions';
import { connect } from 'react-redux';

class ResponseToggleSMSInput extends Component {

    updateSettings = (value, field) => {
        const newSettings = { ...this.props.settings }
        newSettings[field] = value;
        this.props.dispatch(setResponseSiteSettings(newSettings));
    }

    render() {

        const { settings } = this.props

        return (
            <div className="form-group">
                <label className="col-sm-3 control-label">TXT/SMS <TooltipNotification 
                        title={"TXT/SMS"}
                        tooltip={
                            <span className="text-left">
                                <h5>TXT/SMS</h5>
                                <p>Switch this ON and your audience is able to respond via SMS.</p>
                                <p>Select the country you are in and the number will displayed automatically to which your audience can respond.</p> 
                            </span>}>
                        <i className="fa fa-question-circle"></i>
                    </TooltipNotification>
                </label>
                <div className="col-sm-6">
                    <ButtonSwitch onChange={() => this.updateSettings(!settings.textmessagingselected, 'textmessagingselected')} selected={(settings && settings.textmessagingselected) ? "1" : "0"} />
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            settings: state.responseSettingsReducer.settings,
        }
    }
)(ResponseToggleSMSInput);