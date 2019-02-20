import React, { Component } from 'react';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { connect } from 'react-redux';
import { setResponseSiteSettings } from '../actions';

class ResponseURLInput extends Component {

    updateSettings = (value, field) => {
        const newSettings = { ...this.props.settings }
        newSettings[field] = value;
        this.props.dispatch(setResponseSiteSettings(newSettings));
    }

    changeResponseURL = e => {
        this.updateSettings(e.target.value, 'internetaddressoverwrite')
    }
    render() {

        const { settings } = this.props

        return (
            <div className="form-group">
                <label className="col-sm-3 control-label">URL <TooltipNotification 
                    title={"URL"}
                    tooltip={
                        <span className="text-left">
                            <h5>URL</h5>
                            <p>This is the response website URL on which the audience can login to respond to questions. </p>
                            <p>By default, this is sendc.com. Please note that the response website can be fully branded into your style. Click here for more info and prices.</p>
                        </span>}>
                        <i className="fa fa-question-circle"></i>
                    </TooltipNotification>
                </label>
                
                <div className="col-sm-6">
                    {
                        settings && settings.responseSitesList &&
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-link"></i>
                            </span>
                            <select onChange={this.changeResponseURL} value={settings.internetaddressoverwrite} className="form-control">
                                {/* <option value={"--"}>Select Response Site</option> */}
                                {
                                    settings.responseSitesList.map((site, index) => {
                                        return <option key={index} value={(site.domain == 'sendsteps.me')? "": site.domain}>{site.domain}</option>
                                    })
                                }
                            </select>
                        </div>
                    }
                </div>

            </div>
        );
    }
}
{/* <div className="col-sm-6">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-link"></i>
                        </span>
                        <input type="text" value={(settings && settings.internetaddressoverwrite) ? settings.internetaddressoverwrite : ""} disabled="disabled" className="form-control" placeholder="" />
                    </div>
                </div> */}
export default connect(
    state => {
        return {
            settings: state.responseSettingsReducer.settings,
        }
    }
)(ResponseURLInput);