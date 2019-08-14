import React, { Component } from 'react';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { setResponseSiteSettings } from '../actions';
import { connect } from 'react-redux';
import Switch from 'App/components/common/inputs/switch/Switch';

class ResponseToggleInput extends Component {

    updateSettings = (value, field) => {
        const newSettings = { ...this.props.settings }
        newSettings[field] = value;
        if(!value) {
            newSettings['textmessagingselected'] = true
        }
        this.props.dispatch(setResponseSiteSettings(newSettings));
    }



    render() {

        const { settings } = this.props

        return (
            <div className="form-group row">
                <label className="col-sm-3 col-form-label col-form-label-sm text-right">
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
                    <Switch
                        size="sm"
                        onClick={() => this.updateSettings(!settings.internetselected, 'internetselected')}
                        on={<span><i className="fa fa-check"></i> On</span>}
                        off={<span><i className="fa fa-times"></i> Off</span>}
                        offstyle="secondary"
                        active={!!settings.internetselected}
                    />
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