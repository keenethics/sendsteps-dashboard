import React, { Component } from 'react';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { setResponseSiteSettings } from '../actions';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
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
                    {settings && 
                    <ToggleButtonGroup 
                        onChange={() => this.updateSettings(settings.textmessagingselected === "1" ? "0" : "1", 'textmessagingselected')} 
                        type="radio" 
                        name="toggle-response"
                        value={settings.textmessagingselected === "1" ? "1" : "0"}>
                        <ToggleButton value={"1"}><i className="fa fa-check"></i> On</ToggleButton>
                        <ToggleButton value={"0"}><i className="fa fa-times"></i> Off</ToggleButton>
                    </ToggleButtonGroup>}
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