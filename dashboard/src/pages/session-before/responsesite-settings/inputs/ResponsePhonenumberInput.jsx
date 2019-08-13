import React, { Component } from 'react';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { connect } from 'react-redux'
import { setResponseSiteSettings } from '../actions';
class ResponsePhonenumberInput extends Component {

    componentWillReceiveProps(nextProps) {
        const { settings, responsePhonenumbers } = this.props;
        if(this.phonenumberHasChanged(responsePhonenumbers, nextProps.responsePhonenumbers)) {
            let updatedSettings = { ...settings }
            updatedSettings.phonenumberId = nextProps.responsePhonenumbers[settings.phonenumberForeignerCompatible].id
            this.props.dispatch(
                setResponseSiteSettings(
                    updatedSettings
                )
            )
        }
    }

    phonenumberHasChanged(current, next) {
        if(!current || !next) {
            return false;
        }
        const currentKeys = Object.keys(current)
        const nextKeys = Object.keys(next)
        return (current && next) && current[currentKeys[0]] !== next[nextKeys[0]]
    }

    render() {

        const { responsePhonenumbers, settings } = this.props;

        return (
            <div className="form-group row">
                <label className="col-sm-3 col-form-label col-form-label-sm text-right">Phone number <TooltipNotification
                    title={"Phone number"}
                    tooltip={
                        <span className="text-left">
                            <h5>Phone number</h5>
                            <p>This phone number will be published on the instruction and question slides and can be used for those attendees wishing to respond via SMS. </p>
                            <p>A SMS response always starts with the response code.</p>
                        </span>}>
                    <i className="fa fa-question-circle"></i>
                </TooltipNotification>
                </label>
                <div className="col-sm-6">
                    {responsePhonenumbers && responsePhonenumbers[settings.phonenumberForeignerCompatible] &&
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-phone"></i>
                                </span>
                            </div>
                            <input disabled={"disabled"} type="text" value={responsePhonenumbers[settings.phonenumberForeignerCompatible].displayText || ""} className="form-control" />
                        </div>}
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
)(ResponsePhonenumberInput);