import React, { Component } from 'react';
import ButtonSwitch from '../../../../components/common/ButtonSwitch';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { setResponseSiteSettings } from '../actions';
import { connect } from 'react-redux';

class ResponseInternationalInput extends Component {

    updateSettings = (value, field) => {
        const newSettings = { ...this.props.settings }
        newSettings[field] = value;
        this.props.dispatch(setResponseSiteSettings(newSettings));
    }

    changeInternational = () => {
        this.updateSettings(!this.props.settings.phonenumberForeignerCompatible , 'phonenumberForeignerCompatible')
        this.props.getPhonenumberList(this.props.settings.phonenumberCountryisocode, !this.props.settings.phonenumberForeignerCompatible)
    }

    

    render() {

        const { settings } = this.props

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
                    <ButtonSwitch onChange={this.changeInternational} selected={(settings && settings.phonenumberForeignerCompatible) ? "1" : "0"} />
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
)(ResponseInternationalInput);