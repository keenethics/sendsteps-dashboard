import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { setResponseSiteSettings } from '../actions';
import { connect } from 'react-redux';

class ResponseInternationalInput extends Component {

    changeInternational = value => {
        const { responsePhonenumbers } = this.props;
        let newSettings = { ...this.props.settings }
        newSettings['phonenumberForeignerCompatible'] = value
        newSettings['phonenumberId'] = responsePhonenumbers[value].id; 
        this.props.dispatch(setResponseSiteSettings(newSettings));

    }

    isInternationalOnly() {
        const { responsePhonenumbers } = this.props;
        return typeof responsePhonenumbers[2] === 'undefined'
    }

    isLocalOnly() {
        const { responsePhonenumbers } = this.props;
        return typeof responsePhonenumbers[1] === 'undefined'
    }

    render() {

        const { settings, responsePhonenumbers } = this.props

        return (
            <div className="form-group">
                <label className="col-sm-3 control-label">International Audience <TooltipNotification 
                    title={"International Audience"}
                    tooltip={
                        <span className="text-left">
                            <h5>International Audience</h5>
                            <p>If your session is catered to an international audience then the instruction and question slides will contain the phone number inclusive country code.</p>
                        </span>}>
                    <i className="fa fa-question-circle"></i>
                </TooltipNotification>
                </label>
                <div className="col-sm-6">
                    {responsePhonenumbers && 
                    <ToggleButtonGroup 
                        onChange={this.changeInternational} 
                        type="radio" name="options" 
                        value={(settings && settings.phonenumberForeignerCompatible === "1") ? "1" : "2"}>
                        <ToggleButton disabled={this.isLocalOnly()} value={"1"}><i className="fa fa-check"></i> Yes</ToggleButton>
                        <ToggleButton disabled={this.isInternationalOnly()} value={"2"}><i className="fa fa-times"></i> No</ToggleButton>
                    </ToggleButtonGroup >}
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            settings: state.responseSettingsReducer.settings,
            responsePhonenumbers: state.responseSettingsReducer.responsePhonenumbers
        }
    }
)(ResponseInternationalInput);