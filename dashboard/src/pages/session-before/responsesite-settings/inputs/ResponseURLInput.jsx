import React, { Component } from 'react';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { connect } from 'react-redux';

class ResponseURLInput extends Component {

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
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-link"></i>
                        </span>
                        <input type="text" value={(settings && settings.internetaddressoverwrite) ? settings.internetaddressoverwrite : ""} disabled="disabled" className="form-control" placeholder="" />
                    </div>
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
)(ResponseURLInput);