import React, { Component } from 'react';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { setResponseSiteSettings } from '../actions';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { connect } from 'react-redux';

class ResponseToggleInput extends Component {

    updateSettings = (value, field) => {
        const newSettings = { ...this.props.settings }
        newSettings[field] = value;
        this.props.dispatch(setResponseSiteSettings(newSettings));
    }

    render() {

        const { settings } = this.props

        return (
            <div className="form-group">
                <label className="col-sm-3 control-label">
                    Response Website <TooltipNotification 
                        title={"Response Website"}
                        tooltip={
                            <span className="text-left">
                                <h5>Response Website</h5>
                                <p>Switch this ON and your audience is able to respond via a website.</p>
                                <p>They can open this on any device (Smartphone, tablet, laptop etc.).</p> 
                            </span>}>
                        <i className="fa fa-question-circle"></i>
                    </TooltipNotification>
                </label>
                {settings && 
                <div className="col-sm-6">
                    <ToggleButtonGroup 
                        onChange={() => this.updateSettings(settings.internetselected === "1" ? "0" : "1", 'internetselected')} 
                        type="radio" 
                        name="toggle-response"
                        value={settings.internetselected === "1" ? "1" : "0"}>
                        <ToggleButton value={"1"}><i className="fa fa-check"></i> On</ToggleButton>
                        <ToggleButton value={"0"}><i className="fa fa-times"></i> Off</ToggleButton>
                    </ToggleButtonGroup>
                </div>}
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
)(ResponseToggleInput);