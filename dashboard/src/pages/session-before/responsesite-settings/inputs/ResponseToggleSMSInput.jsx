import React, { Component } from 'react';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { setResponseSiteSettings } from '../actions';
import Toggle from 'react-bootstrap-toggle';
import { connect } from 'react-redux';
import DefaultToggle from '../../../../components/common/inputs/toggle/DefaultToggle';

class ResponseToggleSMSInput extends Component {

    updateSettings = (value, field) => {
        const newSettings = { ...this.props.settings }
        newSettings[field] = value;
        if(!value) {
            newSettings['internetselected'] = true
        }
        this.props.dispatch(setResponseSiteSettings(newSettings));
    }

    render() {

        const { settings } = this.props

        return (
            <div className="form-group row">
                <label className="col-sm-3 col-form-label text-right">TXT/SMS <TooltipNotification 
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
                        <DefaultToggle
                            onClick={() => this.updateSettings(!settings.textmessagingselected, 'textmessagingselected')}
                            on={<span><i className="fa fa-check"></i> On</span>}
                            off={<span><i className="fa fa-times"></i> Off</span>}
                            active={!!settings.textmessagingselected}
                        />}
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